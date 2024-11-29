import express from 'express'
import cors from 'cors'
import { MercadoPagoConfig, Preference } from 'mercadopago'
const client = new MercadoPagoConfig({
    accessToken: "APP_USR-4330173678414112-112511-c6bfbb2c6911a03fe98bf824c6e016e1-430440798"
})

const app = express()
const PORT = 3100
app.use(cors("*"))
app.use(express.json())
app.get("/", (req, res) => res.send("Server para pagos online con MercadoPago"))
app.post("/create-preference", async (req, res) => {
    const { items } = req.body
    
    
    try {
        const body = {
            items,
            // back_urls: {
            //     success: "https:/endpointParaSuccess",
            //     failure: "https:/endpointParaFailure",
            //     pending: "https:/endpointParaPending"
            // },
            // auto_return: "approved"
        }
        const preference = new Preference(client)
        const result = await preference.create({ body })
        res.json({ id: result.id })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Error al crear el pago 😡' })

    }

})

app.listen(PORT, (err) => {
    console.log(err ? `Falla al lanzar el servidor: ${err.message}` : `Servidor corre en http://127.0.0.1:${PORT}`)
})


