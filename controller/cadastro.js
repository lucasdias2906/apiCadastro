

const mysql = require("mysql")

const db = mysql.createConnection({
    multipleStatements: true,
    host: 'mysql.cristoematos.com.br',
    user: 'cristoematos',
    password: 'Lucas2906',
    database: 'cristoematos'
})

db.connect(function (err) {
    if (err) throw err
    console.log("Conectado com Sucesso")
})

exports.get = ((req, res) => {
    db.query("SELECT * FROM cadastro", 
        function (err,rows,fields){
            if(!err){
                res.status(200).send({data:rows})
            }else{
                res.status(400).send({
                    message:"erro ao realizar a Consulta",
                    data:rows
                })
            }
        }
    )
})

exports.post = (function (req, res) {
    // pegar dados
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    if (name == "" || email == "" || password == "") {
        return res.send("Todos os campos são Obrigatorios")


    }

    const values = [name, email, password]
    const query = `INSERT INTO cadastro (name,email,password) 
    VALUES (
    '${name}',
    '${email}',
    '${password}')`


    db.query(query, values, function (err, rows, result) {

        // fluexo de erro
        if (!err) {
            return res.status(200).send({
                message: " Cadastro feito com Sucesso"
            })
        }
        console.log(err)
        return res.status(400).send({
            message: "erro ao cadastrar"
        })

    })
})

exports.put = (function (req, res) {
    const { name, email, password, id_user } = req.body


    if (name == "" || email == "" || password == "") {
        return res.send("Todos os campos são obrigatorios")
    }

    const query = `UPDATE cadastro SET name = 
    '${name}', 
    email = '${email}', 
    password = '${password}'
    WHERE id_user = ${id_user}`
    
    db.query(query,function (err, rows, result) {
            if (!err) {
                return res.status(200).send({
                    message: " Cadastro Atualizado com Sucesso"
                })
            }
            console.log(err)

            return res.status(400).send({
                message: "erro ao atualizar o cadastro"
            })

        })

})

exports.delete = ((req, res) => {

    const {id_user} = req.body

    if(!id_user) return res.status(400).send({
        message:"Verifique o ID informado" + id_user
    });

    db.query(`DELETE FROM cadastro WHERE id_user = ${id_user}`,
        function (err, rows, result) {
            
            if (err) {
                return res.status(400).send({
                    message: "erro ao deletar o cadastro" + err,
                    erro: err
                })
            }

            if (rows.affectedRows) return res.status(200).send({
                message:"Cadastro Deletado com sucesso"
            });
            
            return res.status(400).send({ message:"nao houve alteração na base de dados"})
        }
    )
})