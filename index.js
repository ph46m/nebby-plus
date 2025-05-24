//site de api desenvolvido pelo GojoDevs 
//todos credito restrito para o GojoDevs
//Se for posta a base deixa os crÃ©ditos âœ”ï¸
const express = require('express');
const fetch = require('node-fetch');
var fs = require('fs')

const app = express();
const PORT = process.env.PORT || 3000;

// Rotas espec¨ªficas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'docs.html'));
});

app.get('/ds', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ds.html'));
});

app.get('/adm', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'adm.html'));
});

app.get('/jogo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'jogo.html'));
});

app.get('/planos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'planos.html'));
});

const path = require("path");
const { dirname } = require('path');
var __dirname = dirname(__filename);

var key = JSON.parse(fs.readFileSync("./lib/DarkApi/keys.json"));
const users = JSON.parse(fs.readFileSync("./lib/DarkApi/usuarios.json"));

async function loadKeys(apikey, req) {
var i4 = key.map(i => i?.apikey)?.indexOf(apikey)
if(i4 >= 0) {
key[i4].request -= 1;
fs.writeFileSync("./lib/DarkApi/keys.json", JSON.stringify(key, null, 2));
var IP = req.headers['x-real-ip'] || req.connection.remoteAddress || 0;
var i3 = users.map(i => i.key).indexOf(apikey);
if(i3 < 0 && !users.map(i => i.IP).includes(IP?.split(":")[3])){
users.push({key: apikey, IP: [IP?.split(":")[3]]})
fs.writeFileSync("./lib/DarkApi/usuarios.json", JSON.stringify(users, null, 2));
} else if(i3 >= 0 && !users[i3]?.IP.includes(IP?.split(":")[3])) {
users[i3].IP.push(IP?.split(":")[3])
fs.writeFileSync("./lib/DarkApi/usuarios.json", JSON.stringify(users, null, 2));
}}} 

app.get('/api/keyerrada',(req, res) => {
    apikey = req.query.apikey;
    var ITC = key.map(i => i?.apikey)?.indexOf(apikey);
    if(ITC < 0) {
    return res.json({key:'Sua apikey Ã© invalida Ou acabou as requets'})
    } else {return res.json({key:`Sua ApiKey estÃ¡ 100% âœ? - Requests Restantes: ${key[ITC]?.request}`})}})
    

// FunÃ§Ã£o para carregar as chaves existentes do arquivo JSON
let keys = []; // VariÃ¡vel global para armazenar as chaves

// FunÃ§Ã£o para carregar as chaves existentes do arquivo JSON
function loadKeys() {
    const filePath = path.join(__dirname, 'lib', 'DarkApi', 'keys.json');
    if (fs.existsSync(filePath)) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Erro ao carregar as chaves:', err);
            return []; // Retorna um array vazio em caso de erro
        }
    }
    return []; // Retorna um array vazio se o arquivo nÃ£o existir
}

// FunÃ§Ã£o para salvar as chaves no arquivo JSON
function saveKeys(keys) {
    const filePath = path.join(__dirname, 'lib', 'DarkApi', 'keys.json');
    try {
        fs.writeFileSync(filePath, JSON.stringify(keys, null, 2));
    } catch (err) {
        console.error('Erro ao salvar as chaves:', err);
    }
}


keys = loadKeys();


// Middleware para JSON
app.use(express.json());

app.get('/api/add-key', (req, res) => {
    console.log(req.query); // Para depuraÃ§Ã£o
    let a = req.query.a;

    if (!a) {
        return res.json({ resultado: "ParÃ¢metro 'a' Ã© obrigatÃ³rio" });
    }

    var [apikey, senha, rq] = a.split("|");
    var senhaofc = "0310";

    if (senha !== senhaofc) {
        return res.json({ resultado: "Senha invÃ¡lida.." });
    }

    if (!apikey) {
        return res.json({ resultado: "Kd a key.." });
    }

    if (keys.map(i => i.apikey).includes(apikey)) {
        return res.json({ resultado: "Essa key jÃ¡ estÃ¡ inclusa dentro do sistema.." });
    } else {
        const requestCount = Number(rq);
        if (isNaN(requestCount) || requestCount <= 0) {
            return res.json({ resultado: "O nÃºmero de requisiÃ§Ãµes deve ser um nÃºmero vÃ¡lido e maior que zero." });
        }

        keys.push({ apikey: apikey, request: requestCount });
        saveKeys(keys);

        var ITC = keys.findIndex(i => i.apikey === apikey);
        return res.json({
            resultado: `ApiKey: dantes15s Foi Adicionada ao Sistema\nðŸš€\n\nNÃºmero de RequisiÃ§Ãµes DisponÃ­veis: ${keys[ITC]?.request}`
        });
    }
});

// Rota para deletar chave
app.get('/api/del-key', (req, res) => {
    let apikey = req.query.apikey;
    let senha = req.query.senha;
    var senhaofc = "0310";

    if (!apikey) {
        return res.json({ msg: "Kd a key.." });
    }

    if (!senha) {
        return res.json({ msg: "Kd a senha.." });
    }

    if (senha !== senhaofc) {
        return res.json({ msg: "Senha invÃ¡lida.." });
    }

    if (!keys.map(i => i.apikey).includes(apikey)) {
        return res.json({ msg: "Essa key nÃ£o estÃ¡ inclusa.." });
    } else {
        var i2 = keys.map(i => i.apikey).indexOf(apikey);
        keys.splice(i2, 1); // Remove a chave da lista
        saveKeys(keys);

        return res.json({ msg: `apikey dantes15s deletada com sucesso..` });
    }
});


app.get('/api/pinterest', async (req, res) => { 
    var q = req.query.q;
    var apikey = req.query.apikey;

    if (!q || !apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metros faltando: q e apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public/", "apikey.html"));
    }

    await loadKeys(apikey, req);


    try {
        let response = await fetch(`https://api.nexfuture.com.br/api/pesquisas/pinterest?query=${encodeURIComponent(q)}`);
        
        if (!response.ok) {
            throw new Error(`Erro na API externa: ${response.statusText}`);
        }

        let buffer = await response.buffer();

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(buffer);
    } catch (error) {
        console.error("Erro ao buscar a imagem:", error);
        res.status(500).json({ error: "Erro ao processar a imagem, tente novamente mais tarde." });
    }
});

//downloads

app.get('/api/tiktok-src', async (req, res) => {
    var q = req.query.q;
    var apikey = req.query.apikey;

    if (!q || !apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metros faltando: q e apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public/", "apikey.html"));
    }

    await loadKeys(apikey, req);

    try {
        var response = await fetch(`https://api.nexfuture.com.br/api/pesquisas/tiktok/videos?query=${encodeURIComponent(q)}`);
        var data = await response.json();
        var texto = data.resultado;

        res.json({
            Criador: "[ð™²ðš‘ðšŠðš] ð™³ðšŠðš›ðš”-ðš‚ðšðšŠðš›ðšœ",
            resultado: texto
        });
    } catch (error) {
        console.error("Erro ao buscar vÃ­deo", error);
        return res.status(500).json({ error: "Erro ao buscar vÃ­deo, tente novamente mais tarde" });
    }
});

app.get('/api/instadl/v1', async(req, res) => {
    var url = req.query.url;
    var apikey = req.query.apikey;

    if (!url || !apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metros faltando: url e apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public/", "apikey.html"));
    }

    await loadKeys(apikey, req);

    try {
         var response = await fetch(`https://api.nexfuture.com.br/api/downloads/instagram/dl/v2?url=${encodeURIComponent(url)}`);

         var data = await response.json()

         var texto = data.resultado

         res.json({
            Criador: "[ð™²ðš‘ðšŠðš] ð™³ðšŠðš›ðš”-ðš‚ðšðšŠðš›ðšœ",
            provedor: "[ð™²ðš‘ðšŠðš] ð™³ðšŠðš›ðš”-ðš‚ðšðšŠðš›ðšœ",
            resultado: texto
         })
    } catch (error) {
        console.error("Erro ao buscar url", error)
        res.status(500).json({ erro: "Erro ao buscar video."})
    }
})

app.get('/api/play-audio', async (req, res) => {
    const title = req.query.title;
    const apikey = req.query.apikey;

    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (!title || !apikey) {
        return res.status(400).json({
            status: false,
            mensagem: 'Parâmetros "title" e "apikey" são obrigatórios.'
        });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);

    if (!apiKeyData) {
        return res.status(403).json({
            status: false,
            mensagem: 'API Key inválida ou inexistente.'
        });
    }

    if (apiKeyData.request <= 0) {
        return res.status(429).json({
            status: false,
            mensagem: 'Limite de requisições atingido para esta API Key.'
        });
    }

    await loadKeys(apikey, req);

    try {
        const ytRes = await fetch(`https://kamuiapi.shop/api/youtube/play?query=${encodeURIComponent(title)}&apikey=dantes15s`);
        const ytData = await ytRes.json();

        if (!ytData || !ytData.status || !ytData.Link) {
            return res.status(404).json({
                status: false,
                mensagem: 'Música não encontrada.'
            });
        }

        const audioRes = await fetch(`https://kamuiapi.shop/api/download/mp3?url=${encodeURIComponent(ytData.Link)}&apikey=dantes15s`);
        const audioData = await audioRes.json();

        if (!audioData.download?.status || !audioData.download.downloadLink) {
            return res.status(500).json({
                status: false,
                mensagem: 'Erro ao obter o link de áudio.'
            });
        }

        return res.json({
            status: true,
            audio: audioData.download.downloadLink
        });

    } catch (e) {
        console.error("Erro no endpoint /api/play-audio:", e);
        return res.status(500).json({
            status: false,
            mensagem: 'Erro interno ao buscar música.'
        });
    }
});

app.get('/api/youtube-mp4', async (req, res) => {
    const title = req.query.title;
    const apikey = req.query.apikey;

    if (!title || !apikey) {
        return res.json({ status: false, resultado: 'Par?metros faltando: title e apikey s?o necess¨¢rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || (apiKeyData.request !== undefined && apiKeyData.request <= 0)) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    try {
        // Pesquisa o v¨ªdeo pelo t¨ªtulo
        const searchResponse = await fetch(`https://kamuiapi.shop/api/youtube/play?query=${encodeURIComponent(title)}&apikey=dantes15s`);
        const searchResult = await searchResponse.json();

        if (!searchResult || !searchResult.status || !searchResult.Link) {
            return res.status(404).json({ status: false, mensagem: 'V¨ªdeo n?o encontrado.' });
        }

        const downloadUrl = `https://kamuiapi.shop/api/download/mp4?url=${searchResult.Link}&apikey=dantes15s`;

        // Faz o download do buffer do v¨ªdeo
        const videoResponse = await fetch(downloadUrl);
        const videoBuffer = await videoResponse.buffer();

        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', `attachment; filename="${(searchResult.Title || 'video').replace(/[^a-z0-9]/gi, '_')}.mp4"`);

        res.send(videoBuffer);
    } catch (error) {
        console.error("Erro ao baixar v¨ªdeo:", error);
        res.status(500).json({ status: false, mensagem: 'Erro ao processar o v¨ªdeo, tente novamente mais tarde!' });
    }
});

//downloads fim

//plaq comeÃ§o

app.get('/api/plaq1', async (req, res) => {
    var texto = req.query.texto;
    var apikey = req.query.apikey;

    if (!texto) {
        return res.status(400).json({status: false, message: "cade o parametro texto?"})
    }

    if (!apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metro apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    try {
        var response = await fetch(`https://api.nexfuture.com.br/api/plaquinhas/plaq1?query=${encodeURIComponent(texto)}`);

        var buffer = await response.buffer()

        res.setHeader('Content-Type', 'image/jpeg')
        res.send(buffer);
    }catch (error) {
        console.error("Error ao processar imagem", error);
        res.status(500).json({erro: "Error ao processar imagem. tente novamente mais tarde"});
    }
})
app.get('/api/plaq2', async (req, res) => {
    var texto = req.query.texto;
    var apikey = req.query.apikey;

    if (!texto) {
        return res.status(400).json({status: false, message: "cade o parametro texto?"})
    }

    if (!apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metro apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    if (!texto) {
        return res.status(400).json({status: false, message: "cade o parametro texto?"})
    }

    try {
        var response = await fetch(`https://api.nexfuture.com.br/api/plaquinhas/plaq2?query=${encodeURIComponent(texto)}`);

        var buffer = await response.buffer()

        res.setHeader('Content-Type', 'image/jpeg')
        res.send(buffer);
    }catch (error) {
        console.error("Error ao processar imagem", error);
        res.status(500).json({erro: "Error ao processar imagem. tente novamente mais tarde"});
    }
})
app.get('/api/plaq3', async (req, res) => {
    var texto = req.query.texto;
    var apikey = req.query.apikey;

    if (!texto) {
        return res.status(400).json({status: false, message: "cade o parametro texto?"})
    }

    if (!apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metro apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    if (!texto) {
        return res.status(400).json({status: false, message: "cade o parametro texto?"})
    }

    try {
        var response = await fetch(`https://api.nexfuture.com.br/api/plaquinhas/plaq3?query=${encodeURIComponent(texto)}`);

        var buffer = await response.buffer()

        res.setHeader('Content-Type', 'image/jpeg')
        res.send(buffer);
    }catch (error) {
        console.error("Error ao processar imagem", error);
        res.status(500).json({erro: "Error ao processar imagem. tente novamente mais tarde"});
    }
})
app.get('/api/plaq4', async (req, res) => {
    var texto = req.query.texto;
    var apikey = req.query.apikey;

    if (!texto) {
        return res.status(400).json({status: false, message: "cade o parametro texto?"})
    }

    if (!apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metro apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    if (!texto) {
        return res.status(400).json({status: false, message: "cade o parametro texto?"})
    }

    try {
        var response = await fetch(`https://api.nexfuture.com.br/api/plaquinhas/plaq4?query=${encodeURIComponent(texto)}`);

        var buffer = await response.buffer()

        res.setHeader('Content-Type', 'image/jpeg')
        res.send(buffer);
    }catch (error) {
        console.error("Error ao processar imagem", error);
        res.status(500).json({erro: "Error ao processar imagem. tente novamente mais tarde"});
    }
})
app.get('/api/plaq5', async (req, res) => {
    var texto = req.query.texto;
    var apikey = req.query.apikey;

    if (!texto) {
        return res.status(400).json({status: false, message: "cade o parametro texto?"})
    }

    if (!apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metro apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    if (!texto) {
        return res.status(400).json({status: false, message: "cade o parametro texto?"})
    }

    try {
        var response = await fetch(`https://api.nexfuture.com.br/api/plaquinhas/plaq5?query=${encodeURIComponent(texto)}`);

        var buffer = await response.buffer()

        res.setHeader('Content-Type', 'image/jpeg')
        res.send(buffer);
    }catch (error) {
        console.error("Error ao processar imagem", error);
        res.status(500).json({erro: "Error ao processar imagem. tente novamente mais tarde"});
    }
})
app.get('/api/plaq6', async (req, res) => {
    var texto = req.query.texto;
    var apikey = req.query.apikey;

    if (!texto) {
        return res.status(400).json({status: false, message: "cade o parametro texto?"})
    }

    if (!apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metro apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    if (!texto) {
        return res.status(400).json({status: false, message: "cade o parametro texto?"})
    }

    try {
        var response = await fetch(`https://api.nexfuture.com.br/api/plaquinhas/plaq6?query=${encodeURIComponent(texto)}`);

        var buffer = await response.buffer()

        res.setHeader('Content-Type', 'image/jpeg')
        res.send(buffer);
    }catch (error) {
        console.error("Error ao processar imagem", error);
        res.status(500).json({erro: "Error ao processar imagem. tente novamente mais tarde"});
    }
})

///plaq fim


//ias

app.get('/api/gemini', async (req, res) => {
    var texto = req.query.texto;
    var apikey = req.query.apikey;

    if (!texto) {
        return res.status(400).json({ status: false, message: "Cad¨º o par?metro texto?" });
    }

    if (!apikey) {
        return res.json({ status: false, resultado: 'Par?metro apikey ¨¦ necess¨¢rio.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    try {
        const geminiApiKey = 'AIzaSyApl6ORaY8CtlWT37lZeN0_zXyLzU73caM';
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: texto
                            }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();

        if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
            return res.status(500).json({ status: false, erro: 'Erro ao interpretar resposta da Gemini.' });
        }

        const resposta = data.candidates[0].content.parts[0].text;

        res.json({
            Criador: "ph.46m",
            Provedor: "Google Gemini",
            Resposta: resposta
        });
    } catch (error) {
        console.error("Erro ao processar texto:", error);
        res.status(500).json({ Erro: "Erro ao processar Texto. Entre em contato com meu dono!!" });
    }
});

//ias fim

//figurinhas

app.get('/api/figale', async(req, res) => {
    var apikey = req.query.apikey;

    if (!apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metro apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    try {
        var response = await fetch(`https://sugoiapi.space/api/figurinhas?apikey=Bot-Academy`)

        var buffer = await response.buffer()

        res.setHeader('Content-Type', 'image/webp')
        res.send(buffer)
    } catch (error) {
        console.error("Error ao processar a api");
        res.status(500).json({ status: false, erro: "Erro ao processar figurinha...Entre em contato com meu dono"})
    }
})


//end

//outos 

app.get('/api/print-site/v1', async (req, res) => {
    var url = req.query.url;
    var apikey = req.query.apikey;

    if (!url) {
        return res.status(400).json({status: false, message: "cade o parametro url?"})
    }

    if (!apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metro apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    try {
        var response = await fetch(`https://api.nexfuture.com.br/api/outros/printsite?url=${encodeURIComponent(url)}`)

        if (!response.ok) {
            throw new Error(`Erro na API externa: ${response.statusText}`);
        }

        var buffer = await response.buffer();

        res.setHeader('Content-Type', 'image/jpeg')
        res.send(buffer);

    }
    catch (error) {
        console.error("Erro ao buscar a imagem:", error);
        res.status(500).json({ error: "Erro ao processar a imagem, tente novamente mais tarde." });
    }
})

app.get('/api/filmes', async (req, res) => {
    var nome = req.query.nome;
    var apikey = req.query.apikey;

    if (!nome) {
        return res.status(400).json({status: false, message: "cade o parametro nome?"})
    }

    if (!apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metro apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    try {

        var response = await fetch(`https://api.nexfuture.com.br/api/pesquisas/filmes?query=${encodeURIComponent(nome)}`);

        var data = await response.json();

        var texto = data.resultado

        res.json({ 
            Criador: "[ð™²ðš‘ðšŠðš] ð™³ðšŠðš›ðš”-ðš‚ðšðšŠðš›ðšœ",
            Provedor: "[ð™²ðš‘ðšŠðš] ð™³ðšŠðš›ðš”-ðš‚ðšðšŠðš›ðšœ",
            resultad: texto
        })
    } catch (error) {
        console.error("Error ao porcessar api")
        res.status(500).json({status: false, erro: "Erro ao tentar achar o nome.... entre em contato com o meu dono!!"})
    }
})

app.get('/api/wallpaper', async (req, res) =>{
    var text = req.query.text;
    var apikey = req.query.apikey;

    if (!text) {
        return res.status(400).json({status: false, message: "cade o parametro text?"})
    }

    if (!apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metro apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);


    try {
        var response = await fetch(`https://api.nexfuture.com.br/api/pesquisas/wallpaper?query=${encodeURIComponent(text)}`);

        var data = await response.json()

        var imagens = data.resultado.filter(url => url !== null);

        res.json({

            Criador: "[ð™²ðš‘ðšŠðš] ð™³ðšŠðš›ðš”-ðš‚ðšðšŠðš›ðšœ",
            resultados: imagens

        })
    } catch (error) {
        console.error("Erro ao buscar a imagem:", error);
        res.status(500).json({ error: "Erro ao processar a imagem, tente novamente mais tarde." });
    }
});

app.get('/api/dicionario', async (req, res) => {
    var texto = req.query.texto;
    var apikey = req.query.apikey;

    if (!texto) {
        return res.status(400).json({status: false, message: "cade o parametro texto?"})
    }

    if (!apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metro apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);


    try {
        var response = await fetch(`https://api.nexfuture.com.br/api/pesquisas/dicionario?query=${encodeURIComponent(texto)}`);

        var data = await response.json()

        var texto = data.resultado

        res.json({
            Criador: "[ð™²ðš‘ðšŠðš] ð™³ðšŠðš›ðš”-ðš‚ðšðšŠðš›ðšœ",
            resultado: texto
        })

    }catch (error) {
        console.error("Erro ao buscar a imagem:", error);
        res.status(500).json({ error: "Erro ao processar a imagem, tente novamente mais tarde." });
    }
});

app.get('/api/pensador', async (req, res) => {
    var text = req.query.text;
    var apikey = req.query.apikey;

    if (!text) {
        return res.status(400).json({status: false, message: "cade o parametro text?"})
    }

    if (!apikey) {
        return res.json({ status: false, resultado: 'ParÃ¢metro apikey sÃ£o necessÃ¡rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);
    try {
        var response = await fetch(`https://api.nexfuture.com.br/api/outros/pensador?query=${encodeURIComponent(text)}`);

        var data = await response.json()

        var texto = data.resultado

        res.json({
            Criador: "[ð™²ðš‘ðšŠðš] ð™³ðšŠðš›ðš”-ðš‚ðšðšŠðš›ðšœ",
            Provedor: "[ð™²ðš‘ðšŠðš] ð™³ðšŠðš›ðš”-ðš‚ðšðšŠðš›ðšœ",
            resultado: texto
        })
    } catch (error) {
        console.error("Error ao processar texto", error);
        res.status(500).json({erro: "error ao processar pedido. entre em contato com o meu dono"})
    }
});

app.get('/api/signo', async (req, res) => {
    const signo = req.query.signo;
    const apikey = req.query.apikey;

    if (!signo || !apikey) {
        return res.status(400).json({
            status: false,
            mensagem: 'Par?metros "signo" e "apikey" s?o obrigat¨®rios.'
        });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    try {
        const response = await fetch(`https://kamuiapi.shop/api/outros/signos?signo=${encodeURIComponent(signo)}&apikey=dantes15s`);
        const data = await response.json();

        if (!data || !data.titulo) {
            return res.status(404).json({
                status: false,
                mensagem: 'Signo n?o encontrado.'
            });
        }

        res.json({
            "Criador": 'ph.46m',
            "Signo": data.titulo,
            "Previs?o do Dia": data.previsao_do_dia,
            "Previs?o": data.previsao,
            "Imagem": data.img
        });

    } catch (error) {
        console.error("Erro ao buscar signo:", error);
        res.status(500).json({
            status: false,
            mensagem: 'Erro interno ao buscar o signo.'
        });
    }
});

app.get('/api/tiktok', async (req, res) => {
    const link = req.query.link;
    const apikey = req.query.apikey;

    if (!link || !apikey) {
        return res.status(400).json({
            status: false,
            mensagem: 'Par?metros "link" e "apikey" s?o obrigat¨®rios.'
        });
    }

    if (!link.includes("tiktok")) {
        return res.status(400).json({
            status: false,
            mensagem: 'O link precisa ser do TikTok.'
        });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    try {
        const fetchUrl = `https://kamuiapi.shop/api/dl/tiktok?link=${encodeURIComponent(link)}&apikey=dantes15s`;
        const response = await fetch(fetchUrl);
        const json = await response.json();

        if (!json || !json.resultado || !json.resultado.data || !json.resultado.data.play) {
            return res.status(404).json({
                status: false,
                mensagem: 'N?o foi poss¨ªvel baixar o v¨ªdeo.'
            });
        }

        res.json({
            Criador: 'ph.46m',
            status: true,
            video: json.resultado.data.play,
            thumb: json.resultado.data.cover || null,
            titulo: json.resultado.data.title || 'Sem t¨ªtulo'
        });

    } catch (error) {
        console.error("Erro ao baixar v¨ªdeo do TikTok:", error);
        res.status(500).json({
            status: false,
            mensagem: 'Erro ao processar o v¨ªdeo.'
        });
    }
});

app.get('/api/anime', async (req, res) => {
    const nome = req.query.nome;
    const apikey = req.query.apikey;

    if (!nome) return res.status(400).json({ status: false, mensagem: 'Faltando o par?metro nome.' });
    if (!apikey) return res.status(400).json({ status: false, mensagem: 'Faltando o par?metro apikey.' });

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(nome)}&limit=1`);
        const json = await response.json();

        if (!json || !json.data || json.data.length === 0) {
            return res.status(404).json({ status: false, mensagem: 'Anime n?o encontrado.' });
        }

        const anime = json.data[0];

        res.json({
            status: true,
            resultado: {
                "t¨ªtulo": anime.title,
                "t¨ªtulo_japon¨ºs": anime.title_japanese,
                "sinopse": anime.synopsis,
                "epis¨®dios": anime.episodes,
                "status_exibi??o": anime.status,
                "nota": anime.score,
                "imagem": anime.images.jpg.large_image_url,
                "link": anime.url
            }
        });

    } catch (error) {
        console.error("Erro ao buscar anime:", error);
        res.status(500).json({ status: false, mensagem: 'Erro interno ao buscar anime.' });
    }
});

app.get('/api/motivacional', async (req, res) => {
    const { apikey } = req.query;
    if (!apikey) return res.status(400).json({ status: false, mensagem: 'Par?metro apikey obrigat¨®rio.' });

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) return res.sendFile(path.join(__dirname, "./public", "apikey.html"));

    await loadKeys(apikey, req);

    try {
        const frases = [
            "Voc¨º ¨¦ mais forte do que imagina.",
            "Nunca desista dos seus sonhos.",
            "O sucesso come?a com a determina??o.",
            "Voc¨º pode tudo o que quiser. Acredite!",
            "Mesmo devagar, n?o pare de andar.",
                        "nunca desisti dos seus sonhos por que um dia voc¨º pode chegar at¨¦ seu destino",
        ];

        const escolhida = frases[Math.floor(Math.random() * frases.length)];
        res.json({ status: true, mensagem: escolhida });
    } catch (e) {
        res.status(500).json({ status: false, mensagem: 'Erro ao gerar frase motivacional.' });
    }
});

app.get('/api/piada', async (req, res) => {
    const { apikey } = req.query;
    if (!apikey) return res.status(400).json({ status: false, mensagem: 'Par?metro apikey obrigat¨®rio.' });

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) return res.sendFile(path.join(__dirname, "./public", "apikey.html"));

    await loadKeys(apikey, req);

    try {
        const response = await fetch(`https://v2.jokeapi.dev/joke/Any?lang=pt`);
        const joke = await response.json();

        const piada = joke.type === 'single'
            ? joke.joke
            : `${joke.setup}\n\n${joke.delivery}`;

        res.json({ status: true, piada });
    } catch (e) {
        res.status(500).json({ status: false, mensagem: 'Erro ao buscar piada.' });
    }
});

app.get('/api/clima', async (req, res) => {
    const { cidade, apikey } = req.query;
    if (!cidade || !apikey) return res.status(400).json({ status: false, mensagem: 'Par?metros cidade e apikey s?o obrigat¨®rios.' });

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) return res.sendFile(path.join(__dirname, "./public", "apikey.html"));

    await loadKeys(apikey, req);

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=9f1a4246d47a4df48c1133056241105&q=${encodeURIComponent(cidade)}&lang=pt`);
        const data = await response.json();

        if (!data || !data.location) return res.json({ status: false, mensagem: 'Cidade n?o encontrada.' });

        res.json({
            status: true,
            resultado: {
                "local": `${data.location.name}, ${data.location.region} - ${data.location.country}`,
                "temperatura": `${data.current.temp_c}¡ãC`,
                "condi??o": data.current.condition.text,
                "¨ªcone": data.current.condition.icon,
                "vento": `${data.current.wind_kph} km/h`,
                "umidade": `${data.current.humidity}%`
            }
        });
    } catch (e) {
        res.status(500).json({ status: false, mensagem: 'Erro interno ao buscar clima.' });
    }
});

app.get('/api/cachorro', async (req, res) => {
    const apikey = req.query.apikey;
    if (!apikey) return res.json({ status: false, message: 'Par?metro apikey ¨¦ obrigat¨®rio.' });

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        res.json({ status: true, resultado: data.message });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Erro ao buscar imagem de cachorro.' });
    }
});

app.get('/api/raposa', async (req, res) => {
    const apikey = req.query.apikey;
    if (!apikey) return res.json({ status: false, mensagem: "Par?metro 'apikey' ¨¦ obrigat¨®rio." });

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }
    await loadKeys(apikey, req);

    try {
        const response = await fetch('https://randomfox.ca/floof/');
        const data = await response.json();

        res.json({
            status: true,
            animal: "raposa",
            "imagem": data.image,
            "linkFonte": data.link
        });
    } catch (e) {
        console.error("Erro na rota /raposa:", e);
        res.status(500).json({ status: false, mensagem: "Erro ao obter imagem de raposa." });
    }
});

app.get('/api/gato', async (req, res) => {
    const apikey = req.query.apikey;
    if (!apikey) return res.json({ status: false, message: 'Par?metro apikey ¨¦ obrigat¨®rio.' });

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public", "apikey.html"));
    }

    await loadKeys(apikey, req);

    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await response.json();
        res.json({ status: true, resultado: data[0].url });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Erro ao buscar imagem de gato.' });
    }
});

app.get('/api/google-image', async (req, res) => {
    const nome = req.query.nome;
    const apikey = req.query.apikey;

    if (!nome || !apikey) {
        return res.json({ status: false, resultado: 'Par?metros faltando: nome e apikey s?o necess¨¢rios.' });
    }

    const apiKeyData = key.find(i => i.apikey === apikey);
    if (!apiKeyData || apiKeyData.request <= 0) {
        return res.sendFile(path.join(__dirname, "./public/", "apikey.html"));
    }

    await loadKeys(apikey, req);

    try {
        const result = await fetch(`https://kamuiapi.shop/api/pesquisa/gimg?nome=${encodeURIComponent(nome)}&apikey=dantes15s`);
        const images = await result.json();

        if (!Array.isArray(images) || images.length === 0) {
            return res.status(404).json({ status: false, mensagem: "Nenhuma imagem encontrada." });
        }

        const randomImage = images[Math.floor(Math.random() * images.length)].url;

        res.redirect(randomImage); // redireciona para a imagem direto
        // ou se preferir enviar como JSON:
        // res.json({ status: true, imagem: randomImage });

    } catch (error) {
        console.error("Erro ao buscar imagem:", error);
        res.status(500).json({ status: false, mensagem: "Erro ao buscar imagem, tente novamente." });
    }
});

//fim


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
