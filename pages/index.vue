<template>
<div>
<div class="header">
	<div class="header_wrap">
		<div class="logo" @click="goToTop()">
			<i class="el-icon-top"></i>
		</div>
		<el-dropdown>
			<span class="el-dropdown-link">
			導覽列<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item @click.native="scrollToPage(0)">Node 研究手冊</el-dropdown-item>
				<el-dropdown-item v-for="(page,index) in page_data" :key="index" @click.native="scrollToPage(page.num)">ch{{page.num - 1}} {{page.name}}</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</div>
<div class="container">
	<div class="first_page">
		<!-- <logo /> -->
		<img class="img" src="../assets/image/logo.png" alt="image">
		<h1 class="title"><span>NODE</span><span>JS</span></h1>
		<h2 class="subtitle">研究手冊</h2>
	</div>
	<div class="page">
		<div class="ch_wrap">
			<div class="code"></div>
			<div class="name">前言</div>
		</div>
		<div class="content_wrap">
			<div>
				<p>之前後端一直都用著php語言中人人耳熟能詳的Laravel框架，隨著前端開始使用vue.js，然後又前端切版也嘗試用nuxt.js以後，這兩個都是node的環境去做編程的，後來聽說node.js也可以用作於後端架設伺服器，就心想說如果前後端都是node開發環境會不會更方便管理呢？所幸就誕生這個研究手冊了。</p>
			</div>
		</div>
	</div>
	<div class="page">
		<div class="ch_wrap">
			<div class="code"></div>
			<div class="name">認識Node.js</div>
		</div>
		<div class="content_wrap">
			<div class="title">什麼是Node.js？</div>
			<div class="content">
				<p>隨著 Node.js 的問世，前端開發者的觸角也逐漸蔓延到後端；藉由 Node.js，前端開發者得以使用較為熟悉的 JavaScript 為敲門磚，逐步的拓展自己的技術守備範圍。但為什麼為了網頁而生的語言可以透過 Node.js 跑在伺服器端呢？要解開這個問題，就得從認識 Node.js 出發。</p>
				<p>官網有個說法是：<code>Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.</code></p>
				<p>「runtime」 指的是執行環境，就如同網頁上的 JavaScript 是在瀏覽器的 JavaScript 引擎上執行，Node.js 就是一個能執行 JavaScript 的環境，</p>
				<p>而 V8 則是主流瀏覽器 - Google Chrome 的 JavaScript 引擎，負責解析、執行 JavaScript，也就是負責實踐 ECMAScript 規範中定義的部份；另外，V8 是開源的專案，有興趣的同事可以參照 <a href="https://chromium.googlesource.com/v8/v8">Google Git - V8</a>。</p>
				<p>Node.js 以 V8 為核心，加上一系列 C/C++ 的套件，成功的讓 Server 端也可以執行 JavaScript。</p>
				<img class="img" src="../assets/image/page1.jpg" alt="image">
			</div>
			<div class="title">優點</div>
			<div class="content">
				<p>但是後端語言已經這麼多了，我們為什麼還要大費周章的將 JavaScript 移植到 Server 端呢？</p>
				<p>這是因為 JavaScript 是一個事件驅動的語言，透過事件迴圈，能讓執行緒幾乎不會被卡住；而這樣的特性，非常適合用來接收高併發（High Concurrency）的請求。</p>
				<p>例如在傳統的伺服器中，每個使用者的連接都會產生一個新的執行緒（看實作，不一定），並佔據一定的效能，伺服器在高併發的情況下，很容易就會由於應接不暇而無法服務新的流量；但 Node.js 會將每個 request 變成事件迴圈中待處理的事件，主執行緒只負責承接、轉拋、回應，並持續的在事件迴圈中循環，一切都以事件為核心在驅動程式運行，自然也就不會出現執行緒卡死的現象。</p>
				<p>當然，如果是商業邏輯複雜的後端程式，效能瓶頸不在流量的服務，Node.js 就無用武之地；但在設計需要承接高流量，且處理邏輯不太複雜時，Node.js 可能就會是個可以考慮的選項。</p>
			</div>
			<div class="title">功能</div>
			<div class="content">
				<p>前面提到，Node.js 就是一個可以執行 JavaScript 的環境，而這個環境除了提供瀏覽器 Web API 實作的<code>setTimeout</code>、<code>setInterval</code>、<code>console</code>之外，也因為執行環境不同，有另外一系列的 API 供開發者使用，例如可以讀寫檔案的<code>fs</code>、處理網路請求的<code>http</code>、做加解密雜湊處理的 <code>crypto</code>、設定叢集的<code>cluster</code>等等。</p>
			</div>
			<div class="title">事件迴圈</div>
			<div class="content">
				<p>由於 JavaScript 擁有單執行緒的特性，且為了讓執行緒不會被需要等待的同步程式卡住，必須透過事件迴圈的機制來實現這個目標。瀏覽器中 JavaScript 的事件迴圈，其中有很大一部分是由瀏覽器完成的；在 Node.js 中則透過<a href="http://docs.libuv.org/en/v1.x/">libuv</a>來實現這部分的機制。不同於瀏覽器的事件迴圈，Node.js 中的事件迴圈大致會有以下幾個階段：</p>
				<ul>
					<li><code>timers</code>執行 setTimeout setInterval 給的 callback</li>
					<li><code>pending callbacks</code>執行被延遲到下一個事件迴圈的 I/O Callback</li>
					<li><code>idle, prepare</code>Node.js 內部專用的階段</li>
					<li><code>poll</code>檢索新的 I/O events，執行 I/O callbacks</li>
					<li><code>check</code>執行 setImmediate 給的 callback。</li>
					<li><code>close callbacks</code>執行關閉資源的 callback，例如 socket.on('close', ...)</li>
				</ul>
				<p>相對於瀏覽器的事件迴圈多了好多個階段，但其實只是把所有的 callback 分成了四種：timers、I/O events、immediates、close handlers，並依照順序輪流執行，其他在概念上還是一樣的：每個階段有自己的 Queue，輪到它時清空 Queue，到下個階段，周而復始。</p>
				<p>為避免主執行緒阻塞，poll 階段可以設定執行上限，到達上限時就會將 Queue 內的東西移交到 pending callbacks 階段的 Queue 中，下一個事件迴圈時再接續執行。</p>
				<p>比較需要注意的地方是，微任務佇列（microtask queue）在每個階段結束後都會執行、清空，順序是先清空 process.nextTick 的 callback，再執行其他的如 Promise 的 callback。</p>
				<p>常有人誤解 process.nextTick，會想問例如「一個 Tick 是多久？」之類的問題，但其實 Tick 指的就是事件迴圈中的一個階段，因此時間是不固定的喔！</p>
			</div>
			<div class="title">安裝Node.js</div>
			<div class="content">
				<p>假設我們在開發專案的時候會需要切換node版本的時候，這邊建議可以先安裝<a href="https://github.com/nvm-sh/nvm" target="_blank">nvm</a>。</p>
				<pre><code>sudo apt-get update</code><code>sudo apt-get install nodejs</code></pre>
				<p>若要安裝些node js相關的套件就需要額外安裝npm才可以取得。</p>
				<pre><code>sudo apt-get install npm</code></pre>
				<p>待安裝完成以後我們來檢查一下版本看是否有安裝成功。</p>
				<pre><code>node --version</code></pre>
			</div>
			<div class="title">試著創建應用</div>
			<div class="content">
				<p>如果我們使用PHP 來編寫後端的代碼時，需要Apache 或者Nginx 的HTTP 服務器，並配上mod_php5 模塊和php-cgi。從這個角度看，整個"接收HTTP 請求並提供Web 頁面"的需求就不需要PHP 來處理。</p>
				<p>不過對Node.js 來說，概念完全不一樣了。使用Node.js 時，我們不僅僅在實現一個應用，同時還實現了整個HTTP 服務器。事實上，我們的Web 應用以及對應的Web 服務器基本上是一樣的。在我們創建Node.js 第一個"Hello, World!" 應用前，讓我們先了解下Node.js 應用是由哪幾部分組成的：</p>
				<ul>
					<li>引入required 模塊：我們可以使用require指令來載入Node.js 模塊。</li>
					<li>創建服務器：服務器可以監聽客戶端的請求，類似於Apache 、Nginx 等HTTP 服務器。</li>
					<li>接收請求與響應請求：服務器很容易創建，客戶端可以使用瀏覽器或終端發送HTTP 請求，服務器接收請求後返迴響應數據。</li>
				</ul>
			</div>
			<div class="title">引入required 模塊</div>
			<div class="content">
				<p>我們使用require指令來載入http 模塊，並將實例化的HTTP 賦值給變量http</p>
				<pre><code>const http = require("http");</code></pre>
			</div>
			<div class="title">創建服務器</div>
			<div class="content">
				<p>接下來我們使用http.createServer() 方法創建服務器，並使用listen 方法綁定8888 端口。函數通過request, response 參數來接收和響應數據。</p>
				<p>在你項目的根目錄下創建一個叫server.js 的文件</p>
				<pre><code>var http = require ( 'http' ); </code><code>http . createServer ( function ( request , response ) {  </code><code>    response . writeHead ( 200 , { 'Content-Type' : 'text/plain' });</code><code>    response . end ( 'Hello World\n' ); }). listen ( 8888 );</code><code>});</code><code>console . log ( 'Server running at http://127.0.0.1:8888/' );</code></pre>
				<p>以上代碼我們完成了一個可以工作的HTTP 服務器</p>
				<p>打開命令提示字元執行以下代碼</p>
				<pre><code>node server.js</code></pre>
				<p>正常運行的情況下會出現以下字樣</p>
				<pre><code>Server is running at http://127.0.0.1:8888</code></pre>
				<p>接下來你可以開啟瀏覽器輸入以上的連結，就可以看到"hello world"了。</p>
			</div>
		</div>
	</div>
	<div class="page">
		<div class="ch_wrap">
			<div class="code"></div>
			<div class="name">認識Express框架</div>
		</div>
		<div class="content_wrap">
			<div class="title">前言</div>
			<div class="content">
				<p>為了讓我們能快速上手node.js使用框架是必不可少的，在進行實例開發前，我們得先了解Express的運作模式，那它又與原先的Node.js的運作又有何不同呢？</p>
			</div>
			<div class="title">Node.js</div>
			<div class="content">
				<p>以下是node.js的運作模式：</p>
				<img class="img" src="../assets/image/page2.jpg" alt="image">
				<p>圖中的架構是有兩個部分所結合。左邊是主從式架構(Client-server model)，右邊是Node.js的部分，其運作分為4個動作。依序為：</p>
				<ol>
					<li>Client端(指瀏覽器或手機APP...等)發送了一個request給Server端。</li>
					<li>Node.js的HTTP server會將request中的資訊放到特定的function。</li>
					<li>待function處理完，會將結果在回傳到Node.js的HTTP Server。</li>
					<li>Server端回傳了一個response給Client端。</li>
				</ol>
				<p>藉由上述的動作，Node.js就能來針對不同request的需求，來回覆相對應的response。而且，Node.js的HTTP的server也幫我們處理了Client端與JavaScript參數之間的關係。</p>
				<p>舉個例子，若單純使用Node.js來開發個GET method的API，且回傳格式為application/json，其內容為"say": "hi"的話，寫法會是：</p>
				<pre><code>//引入node的http模組。</code><code>const http = require("http");</code><code></code><code>//定義個function來處理即將到來的http request.</code><code>requestHandler = (request, response) => {</code><code></code><code>    // 回傳JSON格式的response訊息</code><code>    const json = JSON.stringify({</code><code>        say: 'hi'</code><code>    });</code><code></code><code>    response.end(json);</code><code>}</code><code></code><code>//使用http模組來建立一個server，並使用上述定義的function來處理request.</code><code>const server = http.createServer(requestHandler);</code><code></code><code>//啟動server並使用3000的port.</code><code>server.listen(3000);</code></pre>
			</div>
			<div class="title">Express</div>
			<div class="content">
				<p>但在Express中，整個運作模式就會變成：</p>
				<img class="img" src="../assets/image/page3.jpg" alt="image">
				<p>圖中的架構是有三個部分所結合。左邊是主從式架構(Client-server model)，中間是Node.js的部分，右邊是Express框架部分，其運作分為5個動作。依序為：</p>
				<ol>
					<li>Client端(指瀏覽器或手機APP...等)發送了一個request給Server端。</li>
					<li>Node.js的HTTP server會將request中的資訊放到Express中處理。</li>
					<li>待Express收到後，後端工程師就可以使用Express所提供的內置的便捷function來進行開發。</li>
					<li>也能使用自行設置或第三方的middleware來幫忙做開發。待function處理完，會將結果在回傳到Node.js的HTTP Server。</li>
					<li>Server端回傳了一個response給Client端。</li>
				</ol>
				<p>與Node.js不同的是，Express有了下述的特色：</p>
				<ol>
					<li>Middleware</li>
					<li>Router</li>
					<li>Subapplication</li>
					<li>Conveniences</li>
				</ol>
			</div>
			<div class="title">Middleware</div>
			<div class="content">
				<p>在Express的開發環境中，假設我們server端收到了一個需要知道這個request傳來的時間(request的時間function)，且之後還要進行認證的功能(request的認證function)...等。待這些function處理完後才能發送response到client端。而中間的這些request所處理的function，我們都可以視為是middleware。</p>
			</div>
			<div class="title">Router</div>
			<div class="content">
				<p>Express提供了Router的功能，透過它我們能更簡便的去設定API的HTTP method及API URL。若單純使用Node.js來做開發，要做到這點用來控管HTTP method及API URL，則需要透過類似下列的判斷才行：</p>
				<pre><code>if (request.method === 'POST' && request.url === '/echo') </code></pre>
				<p>但在Express開發環境中，我們可透過Express的Router內置模組，幫我們更簡便達到控管HTTP method及API URL。</p>
			</div>
			<div class="title">Subapplication</div>
			<div class="content">
				<p>這個特色可以與上一個特色「Router」有關，上述提到我們可以透過Router來協助我們控管HTTP method及API URL，但同時我們也能在單一指定的Router function中，來針對各個API來進行開發。並確保各個API所撰寫的程式碼不會互相影響，間接產生高耦合的問題。</p>
				<p>假設我們有三個API需要開發，分別是：</p>
				<ol>
					<li>HTTP method: GET, API URL: /test1</li>
					<li>HTTP method: GET, API URL: /test2</li>
					<li>HTTP method: POST, API URL: /test3</li>
				</ol>
				<p>在單純只有Node.js的開發環境中會是：</p>
				<pre><code>requestHandler = (request, response) => {</code><code></code><code>    if (request.method === 'GET' && request.url === '/test1') {</code><code>        // do something</code><code>    }</code><code></code><code>    if (request.method === 'GET' && request.url === '/test2') {</code><code>        // do something</code><code>    }</code><code></code><code>    if (request.method === 'POST' && request.url === '/test3') {</code><code>        // do something</code><code>    }</code><code></code><code>}</code></pre>
				<p>在Express開發環境中會是：</p>
				<pre><code>router.get('/test1', function(req, res) {</code><code>    // do something</code><code>}</code><code></code><code>router.get('/test2', function(req, res) {</code><code>    // do something</code><code>}</code><code></code><code>router.post('/test3', function(req, res) {</code><code>    // do something</code><code>}</code></pre>
			</div>
			<div class="title">Conveniences</div>
			<div class="content">
				<p>Express提供了許多自定義的便捷function，透過使用這些function我們可以更快的達到我們所想要做的事情。</p>
				<p>舉個例子，假設我們想要回傳一個content type為application/json的response給client端。</p>
				<p>在Node.js開發環境中會是：</p>
				<pre><code>// 回傳JSON格式的response訊息</code><code>const json = JSON.stringify({</code><code>    say: 'hi'</code><code>});</code><code></code><code>response.end(json);</code></pre>
				<p>在Express開發環境中會是：</p>
				<pre><code>res.json({</code><code>    say: 'hi'</code><code>})</code></pre>
			</div>
			<div class="title">Express的快速建置開發環境</div>
			<div class="content">
				<p>Express提供了一個快速產生環境的指令，其設定開參考<a href="http://expressjs.com/zh-tw/starter/generator.html" target="_blank">Express 應用程式產生器</a>。若要使用，我們可以在terminal中輸入：</p>
				<pre><code>// 安裝express產生器</code><code>$ npm install express-generator -g</code><code>// 生成express應用程式，並建立在`myapp`的資料夾中。</code><code>$ express --view=ejs myapp</code></pre>
				<p>註：ejs為template engine，是可直接透過後端來產出html文件的工具。</p>
				<p>其資料結構為：</p>
				<pre><code>├── app.js</code><code>├── bin</code><code>│        └── www</code><code>├── package.json</code><code>├── public</code><code>│       ├── images</code><code>│       ├── javascripts</code><code>│       └── stylesheets</code><code>│                 └── style.css</code><code>├── routes</code><code>│       ├── index.js</code><code>│       └── users.js</code><code>└── views</code><code>          ├── error.ejs</code><code>          └── index.ejs</code></pre>
				<p>之後再輸入<code>npm install</code>指令，來安裝Express應用程式產生器幫我們設定好的套件。</p>
				<p>這樣Express的開發環境就完成了。</p>
				<p>相對的，若要使用Express的環境來開發上述所提到「開發個GET method的API，且回傳格式為application/json，其內容為"say": "hi"。」的話，我們僅需到routes資料夾中的index.js來進行開發即可，其寫法如下：</p>
				<pre><code>var express = require('express');</code><code>var router = express.Router();</code><code></code><code>/* GET home page. */</code><code>router.get('/', function(req, res, next) {</code><code>    res.json({</code><code>        say: 'hi'</code><code>    })</code><code>});</code><code></code><code>module.exports = router;</code></pre>
				<p>PS：port部分的設定，Express應用程式產生器幫我們設置在bin資料夾的www中，同時，我們也可以透過app.js或自行生成一個資料夾或檔案來管理自定義的middleware部分。</p>
				<p>之後，我們就可以透過指令<code>npm start</code>來開啟整個專案。沒意外應該能在url為localhost:3000中，看到"say": "hi"的application/json response。</p>
			</div>
			<div class="title">Middleware小試身手</div>
			<div class="content">
				<p>我們來試著寫一個各個API被呼叫時，都能共用middleware看看。</p>
				<pre><code>app.use(function (req, res, next) {</code><code>    console.log('Time:', Date.now());</code><code>    next();</code><code>});</code></pre>
				<p>該middleware的功用是當有API被呼叫時，就顯示出被呼叫的時間。</p>
				<p>待加入上述的middleware後，讀者可嘗試透過<code>npm start</code>指令來開啟專案，來看看API被呼叫後，是否有印出呼叫API時的時間。</p>
			</div>
		</div>
	</div>
	<div class="page">
		<div class="ch_wrap">
			<div class="code"></div>
			<div class="name">關於MVC</div>
		</div>
		<div class="content_wrap">
			<div class="title">前言</div>
			<div class="content">
				<p>我們上一篇有說到這次專案會用到express框架，這框架用到的架構就是MVC，在了解這個東西之前我們先來看看MVC的概念。之後就會在講述Node.js的MVC架構，及Express的MVC架構。讓你們能理解它們的不同之處。</p>
			</div>
			<div class="title">MVC</div>
			<div class="content">
				<p>MVC（Model–view–controller）為軟體工程中的一種軟體架構模式。它由三個部分所形成：</p>
			</div>
			<div class="title">Model</div>
			<div class="content">
				<p>主要用來處理資料的邏輯及資料庫的部分。只要是與資料相關的事情，都會交由它處理。</p>
			</div>
			<div class="title">View</div>
			<div class="content">
				<p>將Model的資料透過View來呈現給使用者。</p>
			</div>
			<div class="title">Controller</div>
			<div class="content">
				<p>藉由使用者的行為來控管及觸發特定的事件，並指示該事件所對應的Model來進行處理。</p>
				<p>使用MVC架構的好處就是能協助我們進行程式的維護，這是因為我們賦予程式一個職責分離的設計，使每個程式能夠專心做自己須負責的事情。這不僅利於維護，同時也能讓我們針對各個不同的功能去做測試的動作。試想著，如果我們沒有將程式進行職責分離的動作，這可能會讓單一檔案的程式碼非常的長。若日後發生問題，或是需求改變需要更改特定程式碼...等。眾多例外情況造成維護上或後續開發上的不便。</p>
				<p>舉個例子，若今天程式要進行交接的動作，前人所留下來的程式碼又臭又長，且沒有做MVC或職責分離的動作。當你今天要做code review應該會是一件非常痛苦的事情。</p>
			</div>
			<div class="title">Node.js MVC</div>
			<div class="content">
				<p>在Node.js中的MVC運作會是這樣：</p>
				<img class="img" src="../assets/image/page4.jpg" alt="image">
				<ol>
					<li>Client端發送一個request至server端。</li>
					<li>待Server端收到後，會由controller部分來接收request的訊息，並進行剖析的動作。</li>
					<li>Controller找出與request所相對應的model，並將request交由該model處理。</li>
					<li>待model處理完後，將資料再交回給controller，並讓controller交付給view做處理。</li>
					<li>透過view產生出能讓client所看到的html檔案，並將其結果轉交給server端。</li>
					<li>藉由server端來發送response給client端。</li>
				</ol>
				<p>PS：如果單純是呼叫API，步驟五Controller將model處理完的結果直接交給server端不用給view產出畫面。</p>
			</div>
			<div class="title">Express MVC</div>
			<div class="content">
				<p>在Express中，若我們使用Express的快速建置開發環境的方式產生Express專案的話，其MVC運作會是這樣：</p>
				<img class="img" src="../assets/image/page5.jpg" alt="image">
				<ol>
					<li>Client端發送request至server端。</li>
					<li>Server端將收到的request由特定的router來做處理。</li>
					<li>若收到的request需要跟DB來做撈取資料的動作，則從DB中找尋該資料，並將資料回傳至router中。若無則直接對資料進行後處理的動作。</li>
					<li>待router處理完資料的邏輯後，將其結果傳給view，並由view來產生html文件。</li>
					<li>藉由router來將view所產生的html文件送至server端中。</li>
					<li>Server端回覆response至clietn端。</li>
				</ol>
				<p>PS：如果單純是呼叫API，步驟五藉由router將處理完的結果交由server端。</p>
				<p>藉由Express的快速建置開發環境的專案中，Router本身就會涵蓋了controller及model的部分。</p>
				<p>齊資料結構會是：</p>
				<pre><code>├── app.js</code><code>├── bin</code><code>│        └── www</code><code>├── package.json</code><code>├── public</code><code>│       ├── images</code><code>│       ├── javascripts</code><code>│       └── stylesheets</code><code>│                 └── style.css</code><code>├── routes</code><code>│       ├── index.js</code><code>│       └── users.js</code><code>└── views</code><code>          ├── error.ejs</code><code>          └── index.ejs</code></pre>
				<p>也就是說我們將controller及model的部分都集中寫在routers資料夾底下。假設以routers資料夾中的index.js來說，其程式碼會是：</p>
				<pre><code>var express = require('express');</code><code>var router = express.Router();</code><code></code><code>/* GET home page. */</code><code>router.get('/', function(req, res, next) {</code><code>    // do something</code><code>    // 連接資料庫</code><code>    // 從資料庫將資料撈完後進行res.render的動作。</code><code>});</code><code></code><code>module.exports = router;</code></pre>
				<p>PS：res.render指Express中，讓處理完的資料傳送到view的指令。</p>
			</div>
			<div class="title">自定義的Express MVC</div>
			<div class="content">
				<p>若使用Express的快速建置開發環境的專案，是還沒有做到職責分離的動作，我們可以試著將controller及model加入其中，其運作會是：</p>
				<img class="img" src="../assets/image/page6.jpg" alt="image">
				<ol>
					<li>Client端發送request至server端。</li>
					<li>Server端接收到request後，交由特定的router的function所接收，並呼叫相對應的controller。</li>
					<li>透過相對應的controller function來呼叫特定的model做處理。</li>
					<li>若該request需要與DB來做撈取資料的動作，則從DB中找尋該資料，並將資料回傳至model中。若無則直接對資料進行後處理的動作。</li>
					<li>待model處理完資料的邏輯後，將其結果回傳至controller中。</li>
					<li>Controller將model的資料傳給view，並由view來產生html文件。</li>
					<li>藉由controller來將view所產生的html的文件送至server端中。</li>
					<li>Server端回覆response至client端。</li>
				</ol>
				<p>PS：如果單純是呼叫API：會跳過第6步驟且第7步驟就會變成=>藉由controller將model處理完的結果交由server端。</p>
				<p>資料結構就會變成：</p>
				<pre><code>├── app.js</code><code>├── bin</code><code>│        └── www</code><code>├── controllers</code><code>│        └── index_controller.js</code><code>├── models</code><code>│        └── index_model.js</code><code>├── package.json</code><code>├── public</code><code>│       ├── images</code><code>│       ├── javascripts</code><code>│       └── stylesheets</code><code>│                 └── style.css</code><code>├── routes</code><code>│       ├── index.js</code><code>│       └── users.js</code><code>└── views</code><code>          ├── error.ejs</code><code>          └── index.ejs</code></pre>
				<p>也就是我們加入了controllers及models的資料夾，並讓底下的js擋來分別負責處理controller及model的部分。</p>
				<p>其程式碼的部分就會變成：</p>
				<p>routers資料夾的index.js</p>
				<pre><code>const IndexController = require('../controllers/index_controller');</code><code></code><code>indexController = new IndexController();</code><code></code><code>router.get('/', indexController.sayHiController);</code></pre>
				<p>controllers資料夾的index_controller.js</p>
				<pre><code>const IndexModel = require('../models/index_model');</code><code></code><code>indexModel = new IndexModel();</code><code></code><code>module.exports = class IndexController {</code><code>    sayHiController(req, res ,next) {</code><code>        // do something</code><code>        // 呼叫特定的model</code><code>        // 從資料庫將資料撈完後進行res.json的動作。</code><code>    }</code><code>}</code></pre>
				<p>models資料夾的index_model.js</p>
				<pre><code>module.exports = class IndexModel {</code><code>    sayHiModel(req, res ,next) {</code><code>        // do something</code><code>    }</code><code>}</code></pre>
			</div>
		</div>
	</div>
	<div class="page">
		<div class="ch_wrap">
			<div class="code"></div>
			<div class="name">開始實作：連接資料庫</div>
		</div>
		<div class="content_wrap">
			<div class="title">前言</div>
			<div class="content">
				<p>這邊我們要使用的資料庫是mysql，這邊我們會簡單帶過會用到的套件，然後就會跳到如何連接的步驟。</p>
			</div>
			<div class="title">套件</div>
			<div class="content">
				<p>我們需要使用到些套件。套件的安裝方式則是開啟terminal並移動到專案資料夾底下，並輸入下列指令即可：</p>
				<ul>
					<li>
						<p>mysql：跟MySQL資料庫做聯動。</p>
						<pre><code>$ npm install mysql</code></pre>
					</li>
					<li>
						<p>dotenv：可用來隱藏些敏感性資料。</p>
						<pre><code>$ npm install dotenv</code></pre>
					</li>
				</ul>
			</div>
			<div class="title">連接資料庫</div>
			<div class="content">
				<p>首先，我們在.env的檔案中，先將我們連接資料庫會用到的相關設定輸入進去，這邊我們會用到的是XAMPP的資料庫。</p>
				<pre><code>DB_CONNECTION=mysql</code><code>DB_HOST=localhost</code><code>DB_PORT=3306</code><code>DB_DATABASE=mcd_wms</code><code>DB_USERNAME=root</code><code>DB_PASSWORD=</code></pre>
				<p>完成後，我們在另外到config資料夾中的development_config.js中做一個聯動的設定。而這邊我們會使用到其中一個套件<code>dotenv</code>，它的好處在於我們可以額外搭配.gitignore來做使用。</p>
				<p>.gitignore這塊是因為我們專案都會備份到git，但是有些敏感性資料盡量別丟上去，以免造成日後不必要的麻煩。</p>
				<pre><code>require('dotenv').config()</code><code></code><code>module.exports = {</code><code>    mysql: {</code><code>        host: process.env.DB_HOST,</code><code>        user: process.env.DB_USERNAME,</code><code>        password: process.env.DB_PASSWORD,</code><code>        database: process.env.DB_DATABASE,</code><code>		port: process.env.DB_PORT</code><code>    }</code><code>}</code></pre>
				<p>接著在.gitignore檔案中加入：</p>
				<pre><code># dotenv environment variables file</code><code>.env</code></pre>
				<p>來讓.env檔案不會被git給追蹤。等同於不會跟著被push到remote repository。最後，我們在models資料夾中的connection_db.js來設定連接資料庫：</p>
				<pre><code>// DataBase</code><code>const config = require('../config/development_config');</code><code>const mysqlt = require("mysql");</code><code></code><code>const connection = mysqlt.createConnection({</code><code>    host: config.mysql.host,</code><code>    user: config.mysql.user,</code><code>    password: config.mysql.password,</code><code>    database: config.mysql.database</code><code>	port: config.mysql.port</code><code>});</code><code></code><code>connection.connect(err => {</code><code>    if (err) {</code><code>        console.log('connecting error');</code><code>    } else {</code><code>        console.log('connecting success');</code><code>    }</code><code>});</code><code></code><code>module.exports = connection;</code></pre>
			</div>
		</div>
	</div>
	<div class="page">
		<div class="ch_wrap">
			<div class="code"></div>
			<div class="name">開始實作：註冊使用者</div>
		</div>
		<div class="content_wrap">
			<div class="title">整頓MVC架構</div>
			<div class="content">
				<p>我們先將集中在routes資料夾的index.js檔案，其程式碼拆分成MVC的架構。並賦予這個API的url為/register，我們第一步先來做會員註冊。</p>
				<pre><code>var express = require('express');</code><code>var router = express.Router();</code><code></code><code>const IndexController = require('../controllers/IndexController');</code><code></code><code>indexController = new IndexController();</code><code></code><code>router.post('/register', indexController.registerUser);</code><code></code><code>module.exports = router;</code></pre>
				<p>並使其對應到controllers資料夾的IndexController.js檔案。</p>
				<pre><code>const UserData = require('../models/UserData');</code><code></code><code>module.exports = class Index {</code><code>    registerUser(req, res, next) {</code><code>        // 獲取client端資料</code><code>        const arraydata = {</code><code>            ud_name: req.body.ud_name,</code><code>            ud_account: req.body.ud_account,</code><code>            ud_password: req.body.ud_password,</code><code>            ud_status: req.body.ud_status,</code><code>            ud_admin: req.body.ud_admin,</code><code>            create_user: 'Toby',</code><code>            create_date: onTime(),</code><code>        }</code><code>        // 將資料寫入資料庫</code><code>        UserData(arraydata).then(result => {</code><code>            // 若寫入成功則回傳</code><code>            res.json({</code><code>                status: "註冊成功。",</code><code>                result: result</code><code>			})</code><code>		}, (err) => {</code><code>			// 若寫入失敗則回傳</code><code>			res.json({</code><code>				result: err</code><code>			})</code><code>		})</code><code>	}</code><code>}</code><code></code><code>//取得現在時間，並將格式轉成YYYY-MM-DD HH:MM:SS</code><code>const onTime = () => {</code><code>		const date = new Date();</code><code>	const mm = date.getMonth() + 1;</code><code>	const dd = date.getDate();</code><code>	const hh = date.getHours();</code><code>	const mi = date.getMinutes();</code><code>	const ss = date.getSeconds();</code><code></code><code>	return [date.getFullYear(), "-" +</code><code>		(mm > 9 ? '' : '0') + mm, "-" +</code><code>		(dd > 9 ? '' : '0') + dd, " " +</code><code>		(hh > 9 ? '' : '0') + hh, ":" +</code><code>		(mi > 9 ? '' : '0') + mi, ":" +</code><code>		(ss > 9 ? '' : '0') + ss</code><code>	].join('');</code><code>}</code></pre>
			</div>
			<div class="title">寫入資料庫</div>
			<div class="content">
				<p>我們先來簡單寫一個註冊使用者，為了讓client端的資料傳入資料庫，我們在models資料夾的UserData.js檔案中寫入：</p>
				<pre><code>const db = require('./connection_db');</code><code></code><code>module.exports = function register(arraydata) {</code><code>	let result = {};</code><code>	return new Promise((resolve, reject) => {</code><code>		// 將資料寫入資料庫</code><code>		db.query('INSERT INTO wms_userdata SET ?', arraydata, function (err, rows) {</code><code>			// 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。</code><code>			if (err) {</code><code>				console.log(err);</code><code>				result.status = "註冊失敗。"</code><code>				result.err = "伺服器錯誤，請稍後在試！"</code><code>				reject(result);</code><code>				return;</code><code>			}</code><code>			result.User = arraydata;</code><code>			resolve(result);</code><code>		})</code><code>	})</code><code>}</code></pre>
				<p>現在我們使用Postman來測試看看：</p>
				<img class="img" src="../assets/image/page7.jpg" alt="image">
				<p>接著我們開phpMyAdmin來看看是否真的有新增成功：</p>
				<img class="img" src="../assets/image/page8.jpg" alt="image">
			</div>
		</div>
	</div>
	<div class="page">
		<div class="ch_wrap">
			<div class="code"></div>
			<div class="name">開始實作：登入使用者</div>
		</div>
		<div class="content_wrap">
			<div class="title">前言</div>
			<div class="content">
				<p>在上一篇我們已經完成註冊使用者的功能，接下來我們要來寫登入使用者的功能</p>
			</div>
			<div class="title">資料結構</div>
			<div class="content">
				<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note01" />
			</div>
			<div class="title">會員登入需求</div>
			<div class="content">
				<p>提供一個登入的API，若成功登入就跳轉頁面到index，若失敗回傳警告並且不進行導頁。</p>
			</div>
			<div class="title">驗證帳號密碼是否正確</div>
			<div class="content">
				<p>為了驗證帳號密碼是否正確，這意謂著我們要先把client端的資料取出，並將取出的資料與資料庫的資料做比對。先修改在models資料夾中的UserData.js檔案。</p>
				<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note02" />
				<p>這邊我們做了一個驗證帳密的function，取名叫getUserByLogin，並設定傳入的值為物件。</p>
				<p>之後，我們要修改在controllers裡面的UserDataController.js，我們需要新增一個function負責接收view傳過來的值，並將這個值交給models去跟資料庫溝通判斷這個帳號密碼是否存在，在將答案回傳給view，這就是所謂的MVC架構。</p>
				<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note03" />
				<p>最後我們在routes資料夾的web.js檔案，新增一個api路徑給登入功能(/login)用。</p>
				<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note04" />
				<p>由於是接受敏感資料，所以用的是post方式接收值比較不容易資料外洩。</p>
			</div>
		</div>
	</div>
	<div class="page">
		<div class="ch_wrap">
			<div class="code"></div>
			<div class="name">開始實作：修改會員資料</div>
		</div>
		<div class="content_wrap">
			<div class="title">前言</div>
			<div class="content">
				<p>在上一篇我們已經完成登入使用者的功能，接下來我們要來寫修改會員資料的功能</p>
			</div>
			<div class="title">修改會員資料需求</div>
			<div class="content">
				<p>提供一個可以讓會員修改資料的API。</p>
			</div>
			<div class="title">驗證是否是會員</div>
			<p>在修改會員資料之前我們當然要先判斷是否是會員，是的話才可以進行修改，不是的話就發出警告</p>
			<p>我們先在model資料夾裡的UserData.js新增一個判斷會員的function</p>
			<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note05" />
			<p>判斷是會員以後我們還會用到另一個function用來修改會員資料</p>
			<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note06" />
			<p>接下來我們在controllers資料夾裡的UserDataController.js新增一個function負責處理修改會員資料的功能(actionModifyPersonal)。</p>
			<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note07" />
			<p>controller跟model都設定好了以後就差跟view連接了，我們來設定一下Routes：</p>
			<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note08" />
			<p>這樣修改會員資料的功能也就大功告成了。</p>
		</div>
	</div>
	<div class="page">
		<div class="ch_wrap">
			<div class="code"></div>
			<div class="name">開始實作：首頁撈值</div>
		</div>
		<div class="content_wrap">
			<div class="title">前言</div>
			<div class="content">
				<p>直至上一篇結束，我們的會員系統基本上已經完善了，接下來我們就來呈現首頁資料吧。其實到了這一步，我們基本上已經大致了解node.js的根本了，現在就是要在更熟練這個語法，以及深度了解它</p>
			</div>
			<div class="title">Models</div>
			<div class="content">
				<p>我們這邊要仿造的是bbin的後台，所以目前bbin的index有呈現哪些資訊我們這邊也要一模一樣，這邊model需要的function很多，我會把同在一個model的都一起列出來，以免大家看得霧煞煞。</p>
				<p>首先就是版型資料，我們要修改models資料夾底下的ProjectData.js，這邊都是處理版型相關的相關function</p>
				<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note09" />
				<p>接下來是選中資料，我們要修改models資料夾底下的ModelRecord.js，這邊都是處理選中模板的相關function</p>
				<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note10" />
				<p>再來是系統參數，我們要修改models資料夾底下的SystemParameter.js，這邊是處理這個專案所有的系統參數，都從這邊去撈取。</p>
				<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note11" />
			</div>
			<div class="title">Controller</div>
			<div class="content">
				<p>我們要新增一個controller來統籌所有撈出來的資料並傳給view</p>
				<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note12" />
			</div>
			<div class="title">Route</div>
			<div class="content">
				<p>Model跟Controller都有了，就缺個Route了</p>
				<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note13" />
				<p>到了這一步，我們首頁撈值的部分也順利完成了，呈現部分這邊就不展示了，畢竟這次的研究是以node.js後端為主，前端我們依舊還是用vue，之前的專案一直都是用vue，這邊就沒什麼好介紹的了。</p>
			</div>
		</div>
	</div>
	<div class="page">
		<div class="ch_wrap">
			<div class="code"></div>
			<div class="name">跨域問題</div>
		</div>
		<div class="content_wrap">
			<div class="title">前言</div>
			<div class="content">
				<p>我們在透過api撈值的時候最容易遇到的就是網域的問題，需要允取跨域，不然基本上是撈不到東西的。</p>
				<p>這邊client端跟server端都需要做些相應的設定。</p>
			</div>
			<div class="title">Client端</div>
			<div class="content">
				<p>Step.1 安裝 axios module 以及 proxy module</p>
				<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note14" />
				<p>Step.2 在 nuxt.config.js 檔案中進行設定</p>
				<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note15" />
				<p>Step.3 新增 axios plugin</p>
				<p>在 plugin 資料夾新增一隻 axios.js 檔案：</p>
				<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note16" />
			</div>
		</div>
	</div>
	<div class="page">
		<div class="ch_wrap">
			<div class="code"></div>
			<div class="name">時區問題</div>
		</div>
		<div class="content_wrap">
			<div class="title">前言</div>
			<div class="content">之前使用laravel(php後端框架)都已經幫我們處理好好的所以沒注意到這問題，就是當我們在撈值出來要丟給view之前，server會把所有時間都解析城yyyy-MM-dd'T'HH:mm:ssZ</div>
			<div class="title">T與Z為何??</div>
			<div class="content">
				<p>T = 表示時間元素的開始，也就是說在T之後就是時分秒這些時間元素的開始，類似一種區隔，隔開日期與時間</p>
				<p>Z = 是timezone，也就是時區，這邊預設是UTC，其他時區都是靠+或-HH:mm去位移。</p>
			</div>
			<div class="title">解決辦法</div>
			<div class="content">
				<p>我們需要在資料導出之前將時間改成我們能看懂的樣子，這邊我們需要在bin資料夾裡面的www動點手腳</p>
				<vue-embed-gist gist-id="d8492263603fc4aa14687ffcfbd3591e" file="note17" />
				<p>根據我們下方所寫的function(dateFormat)就可以分別將還有時間元素的以及只有日期元素的date個別處理後再拋出，這樣在前端頁面接收到的值就可以為我們所用了。</p>
			</div>
		</div>
	</div>
</div>
<div class="footer">
	<span class="f_content">Copyright © <span class="f_name">Toby</span> Reserved</span>
</div>
</div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import VueEmbedGist from "vue-embed-gist";
export default {
	// loading: false,
	scrollToTop: true,
	components: {
		VueEmbedGist
	},
	data() {
        return {
			page_data:[],
		}
	},
	created: function() {// 生命週期順位 1

	},
	mounted: function() {// 生命週期順位 2
		// 顯示loading以及移除
		this.$nextTick(() => {
			this.$nuxt.$loading.start()
			setTimeout(() => this.$nuxt.$loading.finish(), 500)
		})
		let self = this;
		var page_array = []
		$('.page').each(function(){
			var array = {};
			var id = 'page'+$(this).index();
			$(this).prop('id',id);
			var chapter = 'chapter ' + ($(this).index()-1);
			$(this).find('.code').text(chapter);
			array.num = $(this).index();
			array.name = $(this).find('.name').text();
			page_array.push(array)
		})
		self.page_data = page_array;
	},
	computed: {// 屬性變更才動作

	},
    methods: {
		// 移動到某章節
		scrollToPage:function(index){
			let self = this;
			if(index != 0){
				var id = '#page'+index;
				var pageScrollTop = $(id).offset().top;
				$('html').animate({ 'scrollTop': pageScrollTop - 60 }, 250);
			}else{
				self.goToTop();
			}

		},
		// 回到最上面
		goToTop:function(){
			$('html').animate({ 'scrollTop': 0 }, 250);
		}
	},
	watch: {// 時刻監聽動作

	}
}
</script>
