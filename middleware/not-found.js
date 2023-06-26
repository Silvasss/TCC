
const notFoundMiddleware = (req, res) => res.status(404).send('Rota inexistente')


export default notFoundMiddleware