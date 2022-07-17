module.exports = {
    sites: [
        {
            "id": "S1",
            "name": "Site One",
            "engine": "bootstrap3",
            "sitenav": ["P1", "P2"],
            "pages":
                [{
                    "id": "P1",
                    "title": "Homepage",
                    "markup": `
<section>
    <grid>
        <row>
            <cell>
                <button class="btn btn-secondary">Inline Button</button>
                <content id="C1000"></content>
            </cell>
        </row>
    </grid>
</section>
`,
                    "url": ""
                },
                {
                    "id": "P2",
                    "title": "Page One",
                    "markup": `
<section>
    <grid>
        <row>
            <cell>
                <content id="C2000"></content>
            </cell>
            <cell>
                <content id="C3000"></content>
            </cell>
        </row>
    </grid>
</section>
`,
                    "url": "p2"
                },
                {
                    "id": "P3",
                    "title": "Auth Page",
                    "markup": `
<section>
    <grid>
        <row>
            <cell>
                <content id="C1000"></content>
            </cell>
            <cell>
                <content id="C6000"></content>
                <content id="C2000"></content>
            </cell>
        </row>
    </grid>
</section>
`,
                    "url": "auth"
                }]
        }, {
            "id": "S2",
            "name": "Site Two",
            "engine": "tailwind",
            "sitenav": ["P1", "P2"],
            "pages":
                [{
                    "id": "P1",
                    "title": "Homepage",
                    "markup": `
<section>
    <grid>
        <row>
            <cell>
                <content id="C1000"></content>
            </cell>
        </row>
    </grid>
</section>
`,
                    "url": ""
                },
                {
                    "id": "P2",
                    "title": "Page One",
                    "markup": `
<section>
    <grid>
        <row>
            <cell>
                <content id="C2000"></content>
            </cell>
            <cell>
                <content id="C3000"></content>
            </cell>
        </row>
    </grid>
</section>
                    `,
                    "url": "p2"
                },
                {
                    "id": "P3",
                    "title": "Auth Page",
                    "markup": `
<section>
    <grid>
        <row>
            <cell>
                <content id="C2000"></content>
            </cell>
            <cell>
                <content id="C3000"></content>
            </cell>
        </row>
    </grid>
</section>
                    `,
                    "url": "auth"
                }]
        }, {
            "id": "S3",
            "name": "Site Three",
            "engine": "skeleton",
            "sitenav": ["P1", "P2"],
            "pages":
                [{
                    "id": "P1",
                    "title": "Homepage",
                    "markup": `
<section>
    <grid>
        <row>
            <cell>
                <content id="C1000"></content>
            </cell>
        </row>
    </grid>
</section>
`,
                    "url": ""
                },
                {
                    "id": "P2",
                    "title": "Page One",
                    "markup": `
<section>
    <grid>
        <row>
            <cell>
                <content id="C2000"></content>
            </cell>
            <cell>
                <content id="C3000"></content>
            </cell>
        </row>
    </grid>
</section>
                `,
                    "url": "p2"
                },
                {
                    "id": "P3",
                    "title": "Auth Page",
                    "markup": `
<section>
    <grid>
        <row>
            <cell>
                <content id="C2000"></content>
            </cell>
            <cell>
                <content id="C3000"></content>
            </cell>
        </row>
    </grid>
</section>
                `,
                    "url": "auth"
                }]
        }
    ],
    content: [
        {
            "id": "C1000",
            "markup": `
<div class="text">
    <h1>Hello World</h1>
</div>
            `
        },
        {
            "id": "C2000",
            "markup": `
<button onClick="">Click Here</button>`
        },
        {
            "id": "C3000",
            "markup": `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`
        },
        {
            "id": "C4000",
            "markup": `
<server:time></server:time>
`
        },
        {
            "id": "C5000",
            "markup": `
<ul role="list">
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
</ul>`
        },
        {
            "id": "C6000",
            "markup": `
<div class="form">
    <form>
        <label>Username</label>
        <input type="text"></input>
        <br/>
        <label>Password</label>
        <input type="text"></input>
    </form>
</div>
`
        },
        {
            "id": "C7000",
            "markup": `
<img src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4QWs8?ver=95ec&q=90&m=6&h=270&w=270&b=%23FFFFFFFF&f=jpg&o=f&aim=true" alt="image"></img>
`        }
    ]
}