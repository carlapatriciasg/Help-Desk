const Chamado = require('../models/chamadoModelo');
const ChamadoHistorico = require('../models/ChamadoHistorico');
const EmailService = require('../service/EmailService');
const { where } = require('sequelize');
const { Op } = require('sequelize');

exports.Abertura = async (req, res) => {
    const { titulo, categoria, subcategoria, prioridade, descricao, userEmail, anexo } = req.body;
    //validações
    if(!titulo){
        return res.status(422).json({msg: 'O titulo é obrigatório'})
    }
    if(!categoria){
        return res.status(422).json({msg: 'A categoria é obrigatória'})
    }
    if(!subcategoria){
        return res.status(422).json({msg: 'A subcategoria é obrigatória'})
    }
    if(!prioridade){
        return res.status(422).json({msg: 'A prioridade é obrigatória'})
    }
    if(!descricao){
        return res.status(422).json({msg: 'A descrição é obrigatória'})
    }

    try{
    const now = new Date()
    const newId = await gerarID();
    //criação de chamado    
    await Chamado.create({
        id: newId,
        titulo: titulo,
        categoria: categoria,
        subcategoria: subcategoria,
        prioridade: prioridade,
        descricao: descricao,
        userEmail,
        status: 'Aberto',
        agente: null,
        anexo
    });
    //criação do historico do chamado
    await ChamadoHistorico.create({
        chamadoId: newId,
        type: 'Criado',
        user: null,
        timestamp: now,
        detalhes: 'Chamado criado'
    });

        // Monta o conteúdo do e-mail
        const assunto = `Chamado aberto: ${titulo}`;
        const texto = `
            Seu chamado foi criado com sucesso!
            Número: ${newId}
            Título: ${titulo}
            Categoria: ${categoria} / ${subcategoria}
            Prioridade: ${prioridade}
            Descrição: ${descricao}
        `;
        const html = `
            <h2>Seu chamado foi criado com sucesso!</h2>
            <ul>
                <li><b>Número:</b> ${newId}</li>
                <li><b>Título:</b> ${titulo}</li>
                <li><b>Categoria:</b> ${categoria} / ${subcategoria}</li>
                <li><b>Prioridade:</b> ${prioridade}</li>
                <li><b>Descrição:</b> ${descricao}</li>
            </ul>
        `;

        // Envia o e-mail
        try {
            await EmailService.sendEmail(userEmail, assunto, texto, html);
            console.log('E-mail de abertura de chamado enviado para', userEmail);
        } catch (emailError) {
            console.error('Falha ao enviar e-mail de abertura:', emailError);
        }

        return res.status(201).json({ msg: 'Chamado criado com sucesso!' });
    } catch(err){
        console.error('Erro ao criar chamado: ', err)
        return res.status(500).json({msg: 'Erro interno, tente novamente'})
    }
    //gerar ID para os chamados
    async function gerarID() {
        const count = await Chamado.count()
        return `HD-${String(count + 1).padStart(3, '0')}`
    }
}

exports.ChamadoDoUsuarios = async (req, res) => {
    const email = req.query.email

    if(!email){
        return res.status(400).json({msg: 'E-mail é obrigatório'})
    }

    try{
        let chamado = await Chamado.findAll({
            where: {
                userEmail: email,
                status: 'Aberto'
            },
            order: [['createdAt', 'DESC']]
        })

        if(chamado.length === 0){
            chamado = await Chamado.findAll({
            where: {
                agente: email,
                status: 'Aberto'
            },
            order: [['createdAt', 'DESC']]})
        }
    res.status(200).json(chamado)
    } catch(error) {
        console.error('Erro ao buscar chamados: ', error)
        res.status(500).json({msg: 'Erro ao buscar chamados'})
    }
}

exports.ChamadoRelatorio = async (req, res) => {
    const email = req.query.email

    if(!email){
        return res.status(400).json({msg: 'E-mail não localizado'})
    }

    try{
        let chamado = await Chamado.findAll({
            where: {
                userEmail: email,
            },
            order: [['createdAt', 'DESC']]
        })

        if(chamado.length === 0){
            chamado = await Chamado.findAll({
            where: {
                agente: email,
            },
            order: [['createdAt', 'DESC']]})
        }

        const chamadosTotais = await Chamado.count({ where: {agente: email}})

        const chamadosResolvidos = await Chamado.count({where: {
            agente: email,
            status: { [Op.iLike]: 'resolvido'}
        }})

        const chamadosPendentes = await Chamado.count({where: {
            agente: email,
            [Op.or]: [
                { status: { [Op.iLike]: 'aberto' } },
                { status: { [Op.iLike]: 'em atendimento' } }]
        }})

        res.status(200).json({
            listas: chamado,
            resumo: {
                total: chamadosTotais,
                resolvidos: chamadosResolvidos,
                pendentes: chamadosPendentes
            }
        });
    }catch(erro){
        console.error('erro no relatorio dos chamados: ', erro)
        res.status(500).json({msg: 'Erro no relatorio do chamado'})
    }
}

exports.TodosChamados = async (req, res) => {
    const email = req.query.email

    if(!email){
        return res.status(400).json({msg: 'E-mail é obrigatório'})
    }

    try{
        let chamado = await Chamado.findAll({
            where: {
                userEmail: email,
            },
            order: [['createdAt', 'DESC']]
        })

        if(chamado.length === 0){
            chamado = await Chamado.findAll({
            where: {
                agente: email,
            },
            order: [['createdAt', 'DESC']]
        })
    }
    res.status(200).json(chamado)
    } catch(error) {
        console.error('Erro ao buscar chamados: ', error)
        res.status(500).json({msg: 'Erro ao buscar chamados'})
    }
}

exports.ListaTodosChamados = async (req, res) => { 

    try{
        const chamados =await Chamado.findAll({order: [['createdAt', 'DESC']]})
        res.status(200).json(chamados)
    }catch(erro){
        console.error('Erro na lista de chamados: ', erro)
        res.status(500).json({ msg: 'Erro na listagem de chamados'})
    }
}

exports.chamadosContador = async (req, res) =>{
    const {emailAnalista} = req.query

    try {
        const [abertos , emAtendimento, resolvidos, fechados] = await Promise.all([
            Chamado.count({where: { agente: emailAnalista, status: 'Aberto'}}),
            Chamado.count({where: { agente: emailAnalista, status: 'Em Atendimento'}}),
            Chamado.count({where: { agente: emailAnalista, status: 'Resolvido'}}),
            Chamado.count({where: { agente: emailAnalista, status: 'Fechado'}})
        ])
        res.json({ abertos, emAtendimento, resolvidos, fechados})
    }catch(erro){
        console.error('Erro no contador de chamados: ', erro)
        res.status(500).json({msg: 'Erro interno'})
    }
}

exports.BuscarChamadoPorId = async (req, res) => {
    const chamadoId = req.params.id;
    console.log('BuscarChamadoPorId chamadoId:', chamadoId);

    try {
        const chamado = await Chamado.findOne({
            where: { id: chamadoId },
            include: [
                {
                    model: ChamadoHistorico,
                    as: 'historico',
                    order: [['timestamp', 'DESC']]
                }
            ]
        });

        if (!chamado) {
            console.log('Chamado não encontrado para ID:', chamadoId);
            return res.status(404).json({ msg: 'Chamado não encontrado' });
        }

        // Preparar dados para resposta
        const response = {
            chamado: {
                id: chamado.id,
                titulo: chamado.titulo,
                descricao: chamado.descricao,
                status: chamado.status,
                prioridade: chamado.prioridade,
                categoria: chamado.categoria,
                solicitante: chamado.userEmail,
                analista: chamado.agente,
                criadoEm: chamado.createdAt,
                atualizadoEm: chamado.updatedAt,
                historico: chamado.historico.map(h => ({
                    acao: h.type,
                    data: h.timestamp,
                    descricao: h.detalhes
                })),
                anexos: chamado.anexo ? [{ nome: chamado.anexo }] : []
            }
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Erro ao buscar chamado por ID:', error);
        res.status(500).json({ msg: 'Erro interno ao buscar chamado' });
    }
};
