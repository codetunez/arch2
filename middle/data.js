module.exports = {
    sites: [
        {
            "id": "S1",
            "engine": "bootstrap3",
            "pages":
                [{
                    "id": "P1",
                    "markup": "<section><grid><row><cell><content id='C1000'></content></cell></row></grid>",
                    "url": ""
                },
                {
                    "id": "P2",
                    "markup": "<section><grid><row><cell><content id='C2000'></content></cell><cell><content id='C3000'></content></cell></row></grid>",
                    "url": "p2"
                },
                {
                    "id": "P3",
                    "markup": "<section><grid><row><cell><content id='C1000'></content></cell><cell><content id='C6000'></content><content id='C2000'></content></cell></row></grid>",
                    "url": "auth"
                }]
        }, {
            "id": "S2",
            "engine": "tailwind",
            "pages":
                [{
                    "id": "P1",
                    "markup": "<section><grid><row><cell><content id='C1000'></content></cell></row></grid>",
                    "url": ""
                },
                {
                    "id": "P2",
                    "markup": "<section><grid><row><cell><content id='C2000'></content></cell><cell><content id='C3000'></content></cell></row></grid>",
                    "url": "p2"
                },
                {
                    "id": "P3",
                    "markup": "<section><grid><row><cell><content id='C1000'></content></cell><cell><content id='C6000'></content></cell></row></grid>",
                    "url": "auth"
                }]
        }, {
            "id": "S3",
            "engine": "skeleton",
            "pages":
                [{
                    "id": "P1",
                    "markup": "<section><grid><row><cell><content id='C1000'></content></cell></row></grid>",
                    "url": ""
                },
                {
                    "id": "P2",
                    "markup": "<section><grid><row><cell><content id='C2000'></content></cell><cell><content id='C3000'></content></cell></row></grid>",
                    "url": "p2"
                },
                {
                    "id": "P3",
                    "markup": "<section><grid><row><cell><content id='C1000'></content></cell><cell><content id='C6000'></content></cell></row></grid>",
                    "url": "auth"
                }]
        }
    ],
    content: [
        {
            "id": "C1000",
            "content": "<div class='text'><h1>Hello Worlssssd</h1></div>"
        },
        {
            "id": "C2000",
            "content": "<button onClick=''>Click Here</button>"
        },
        {
            "id": "C3000",
            "content": "<p>Lorem Ipsom</p>"
        },
        {
            "id": "C4000",
            "content": "<server:time></server:time>"
        },
        {
            "id": "C5000",
            "content": "<ul role=\"list\"><li>One</li><li>Two</li><li>Three</li></ul>"
        },
        {
            "id": "C6000",
            "content": "<label>Username</label><input type='text'></input><br/><label>Password</label><input type='text'></input>"
        }
    ]

}