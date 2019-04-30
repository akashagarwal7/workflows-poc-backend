const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/getName', (req, res) => res.send(`Hello ${req.param.fname}`))

const lib = function () {
    this.renderMood = function (res) {
        res.send('Mood renderer called')
    }
    this.inputMood = function (res) {
        let output = [
            {
                component: 'TextRender',
                props: {
                    value: 'Enter your name:',
                    class: "class1"
                }
            },
            {
                component: 'FormRender',
                props: {
                    method: 'get',
                    action: '/getName'
                },
                children: [
                    {
                        component: 'InputRender',
                        props: {
                            type: 'text',
                            name: 'fname'
                        }
                    },
                    {
                        component: 'InputRender',
                        props: {
                            type: 'submit',
                            value: 'Submit'
                        }
                    }
                ]
            }

        ]
        res.send(output)
    }
}

const obj = new lib()

app.get('/m', (req, res) => {
    console.log('request received on /m')
    // console.log(req)

    if (!obj[req.query.flow]) return res.send('No flow for that name exists')
    return obj[req.query.flow](res)
    // res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))