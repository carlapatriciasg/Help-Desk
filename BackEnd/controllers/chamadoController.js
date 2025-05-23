const Chamado = require('../models/chamadoModelo');
const ChamadoHistorico = require('../models/ChamadoHistorico');

exports.Abertura = async (req, res) => {
    const {titulo, categoria, subcategoria, prioridade, descricao, userEmail} = req.body;
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
        agente: null
    });
    //criação do historico do chamado
    await ChamadoHistorico.create({
        chamadoId: newId,
        type: 'Criado',
        user: null,
        timestamp: now,
        detalhes: 'Chamado criado'
    });
        return res.status(201).json({msg:  'Chamado criado'});
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
        const chamado = await Chamado.findAll({
            where: {
                userEmail: email,
                status: 'Aberto'
            },
            order: [['createdAt', 'DESC']]
        })
        res.status(200).json(chamado)
    } catch(error) {
        console.error('Erro ao buscar chamados: ', error)
        res.status(500).json({msg: 'Erro ao buscar chamados'})
    }
}