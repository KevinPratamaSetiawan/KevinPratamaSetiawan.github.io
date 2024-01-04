<?php
include('article-database.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ARTICLES</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Teko:wght@300&display=swap" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Teko:wght@300&display=swap" rel="stylesheet">

    <style>
        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            list-style: none;
            text-decoration: none;
        }

        body{
            background-color: #f0f0f0;
            background-image: url('/Web Sampah/img/bgh.jpg');
            /* background-image: url('/Web Sampah/img/pattern-team.png'); */
            min-height: 100vh;

            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        body::-webkit-scrollbar{
            display: none;
        }

        header{
            font-family: 'Teko', sans-serif;
            position: sticky;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
            padding: 20px;

            background-color: white;
            box-shadow: 0px 1px 7px #252525;
        }

        .logo-container{
            padding: 20px;
            position: absolute;
            left: 0;
        }

        .list-container{
            justify-content: center;
        }

        .list-container ul{
            display: flex;
            justify-content: space-between;
            width: 50vw;
            font-size: 1.1rem;
            color: #252525;
        }

        .list-container ul a{
            padding: 2px 5px;
            font-size: 1.1rem;
            color: #252525;
        }

        .nav-items:hover{
            padding: 2px 5px;
            background-color: #252525;
            color: #f0f0f0;
            border-radius: 2px;
        }

        .content-container{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            margin: 40px 0px;
        }

        .articles-section{
            width: 70vw;
            padding: 20px;

            background-color: #ffffff;
            border-radius: 5px;
            border: 2px solid #252525;
        }

        .article{
            padding: 5px 15px;
            margin: 10px 0px;
            border: 2px solid #252525;
            border-radius: 5px;
        }

        .article-attributes{
            color: #252525;
            font-family: 'Teko', monospace;

            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: start;
        }

        .title-attribute{
            text-transform: uppercase;
            font-weight: 500;
            font-size: 2rem;

            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            margin-bottom: -15px;

            background: none;
            color: inherit;
            border: none;
            cursor: pointer;
            outline: inherit;
        }

        .title-attribute:hover{
            color: #3da9fc;
            text-decoration: underline;
        }

        .tag-attribute{
            text-transform: uppercase;
            font-size: 1.25rem;
        }

        .desc-attribute{
            font-family: 'Noto Sans', monospace;
            color: #535353;
            text-align: justify;
            font-size: .9rem;

            height: 42px;
            margin-bottom: 10px;
            overflow: hidden;
        }

        .author-attribute{
            font-size: 1.1rem;
        }

        .date-attribute{
            font-size: 1.1rem;
        }

        .bottom-attribute{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        footer{
            font-family: 'Teko', sans-serif;
            /* position: fixed; */
            bottom: 0;
            left: 0;
            z-index: 0;

            background-color: white;
            box-shadow: 0px 1px 7px #252525;
        }

        .top-footer{
            display: flex;
            padding: 20px 20px 0px 20px;
            width: 100vw;
        }

        .left-footer{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 50vw;
        }

        .left-footer p{
            padding: 0px 0px 10px 0px;
        }

        .pages-container ul{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 80%;

            color: #252525;
            font-size: 1.1rem;
        }

        .pages-container ul a{
            padding: 2px 5px;
            color: #252525;
        }

        .footer-items:hover{
            padding: 2px 5px;
            background-color: #f0f0f0;
            color: #252525;
            border-radius: 2px;
        }

        .social-container ul{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 80%;

            color: #252525;
        }

        .right-footer{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50vw;
        }

        .bottom-footer{
            display: flex;
            justify-content: center;
            align-items: center;

            padding: 20px 40px 40px 40px;
        }

        .footer-vertical{
            margin: 0;
            color: #252525;

            display: flex;
            flex-direction: row;

            width: 0;
            height: 100%;

            border: 1px solid #252525;
        }

        .footer-horizontal{
            margin: 10px 0px;
            color: #252525;
            width: 100vw;
            stroke: 5px;

            border: 1px solid #252525;
        }

        .footer-items:hover{
            padding: 2px 5px;
            background-color: #252525;
            color: #f0f0f0;
            border-radius: 2px;
        }
    </style>
</head>
<body>
    <header>
        <div class="logo-container">
            <img src="/Web Sampah/img/logo-square.svg" alt="Logo Kelompok 186"
            height="30px"

            style="
            /* color: #252525; */

            filter: invert(7%) sepia(7%) saturate(18%) hue-rotate(330deg) brightness(95%) contrast(82%);
            "
            >
        </div>

        <div class="list-container">
            <ul>
                <li class="items">|</li>
                <li><a href="index.html" data-value="HOME" class="items nav-items nav-item1">HOME</a></li>
                <li class="items">|</li>
                <li><a href="guides.html" data-value="GUIDES" class="items nav-items nav-item2">GUIDES</a></li>
                <li class="items">|</li>
                <li><a href="articles-list.php" data-value="ARTICLES" class="items nav-items nav-item3">ARTICLES</a></li>
                <li class="items">|</li>
                <li><a href="about.html" data-value="ABOUT" class="items nav-items nav-item4">ABOUT</a></li>
                <li class="items">|</li>
            </ul>
        </div>
    </header>

    <div class="content-container">
        <section class="filter-section">

        </section>
        <section class="articles-section">
            <?php for($i=0;$i<sizeof($article_list);$i++){?>
                <div class="article">
                    <form action="article-page.php" method="post">
                        <input type="submit" class="article-attributes title-attribute" value="<?php echo $article_list[$i]['article-title']; ?>">
                        <!-- <p class="article-attributes title-attribute">Title</p> -->
                        <p class="article-attributes tag-attribute"><?php echo $article_list[$i]['article-tag']; ?></p>
                        <p class="article-attributes desc-attribute"><?php echo $article_list[$i]['article-desc']; ?></p>
                        <div class="article-attributes bottom-attribute">
                            <p class="author-attribute"><?php echo $article_list[$i]['article-author']; ?></p>
                            <p class="date-attribute"><?php echo $article_list[$i]['article-date']; ?></p>
                        </div>
                        <input type="hidden" name="article-title" value="<?php echo $article_list[$i]['article-title']; ?>">
                        <input type="hidden" name="article-html" value="<?php echo $article_list[$i]['article-html']; ?>">
                    </form>
                </div>
            <?php }?>

            <div class="article">
                <p class="article-attributes title-attribute">Title</p>
                <p class="article-attributes tag-attribute">Tag</p>
                <p class="article-attributes desc-attribute">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, recusandae esse. Optio praesentium quod blanditiis aliquam laborum possimus, vel ipsum neque tenetur exercitationem assumenda, eos ratione consectetur eveniet, suscipit iste eum repudiandae! Iste eius eaque mollitia, necessitatibus accusantium iusto consequuntur ratione quo quos perspiciatis distinctio molestias magnam molestiae quia earum.</p>
                <!-- <p class="article-attributes desc-attribute">...</p> -->
                <div class="article-attributes bottom-attribute">
                    <p class="author-attribute">Author</p>
                    <p class="date-attribute">01-01-2024</p>
                </div>
            </div>

            <div class="article">
                <p class="article-attributes title-attribute">Title</p>
                <p class="article-attributes tag-attribute">Tag</p>
                <p class="article-attributes desc-attribute">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, recusandae esse. Optio praesentium quod blanditiis aliquam laborum possimus, vel ipsum neque tenetur exercitationem assumenda, eos ratione consectetur eveniet, suscipit iste eum repudiandae! Iste eius eaque mollitia, necessitatibus accusantium iusto consequuntur ratione quo quos perspiciatis distinctio molestias magnam molestiae quia earum.</p>
                <!-- <p class="article-attributes desc-attribute">...</p> -->
                <div class="article-attributes bottom-attribute">
                    <p class="author-attribute">Author</p>
                    <p class="date-attribute">01-01-2024</p>
                </div>
            </div>

            <div class="article">
                <p class="article-attributes title-attribute">Title</p>
                <p class="article-attributes tag-attribute">Tag</p>
                <p class="article-attributes desc-attribute">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, recusandae esse. Optio praesentium quod blanditiis aliquam laborum possimus, vel ipsum neque tenetur exercitationem assumenda, eos ratione consectetur eveniet, suscipit iste eum repudiandae! Iste eius eaque mollitia, necessitatibus accusantium iusto consequuntur ratione quo quos perspiciatis distinctio molestias magnam molestiae quia earum.</p>
                <!-- <p class="article-attributes desc-attribute">...</p> -->
                <div class="article-attributes bottom-attribute">
                    <p class="author-attribute">Author</p>
                    <p class="date-attribute">01-01-2024</p>
                </div>
            </div>

            <div class="article">
                <p class="article-attributes title-attribute">Title</p>
                <p class="article-attributes tag-attribute">Tag</p>
                <p class="article-attributes desc-attribute">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, recusandae esse. Optio praesentium quod blanditiis aliquam laborum possimus, vel ipsum neque tenetur exercitationem assumenda, eos ratione consectetur eveniet, suscipit iste eum repudiandae! Iste eius eaque mollitia, necessitatibus accusantium iusto consequuntur ratione quo quos perspiciatis distinctio molestias magnam molestiae quia earum.</p>
                <!-- <p class="article-attributes desc-attribute">...</p> -->
                <div class="article-attributes bottom-attribute">
                    <p class="author-attribute">Author</p>
                    <p class="date-attribute">01-01-2024</p>
                </div>
            </div>
        </section>
    </div>

    <footer id="footer">
        <div class="top-footer">
            <div class="left-footer">
                <div class="pages-container">
                    <p>More : </p>
                    <ul>
                        <!-- <li class="items">|</li> -->
                        <li><a href="index.html" data-value="HOME" class="items footer-items footer-item1">HOME</a></li>
                        <!-- <li class="items">|</li> -->
                        <li><a href="guides.html" data-value="GUIDES" class="items footer-items footer-item2">GUIDES</a></li>
                        <!-- <li class="items">|</li> -->
                        <li><a href="articles-list.php" data-value="ARTICLES" class="items footer-items footer-item3">ARTICLES</a></li>
                        <!-- <li class="items">|</li> -->
                        <li><a href="about.html" data-value="ABOUT" class="items footer-items footer-item4">ABOUT</a></li>
                        <!-- <li class="items">|</li> -->
                    </ul>
                </div>
                <div class="social-container">
                    <p>Follow Us : </p>
                    <ul>
                        <li>
                            <a href="https://www.instagram.com/kkn.negerijemanten/" target="_blank">
                                <img src="/Web Sampah/img/logo-instagram.svg" alt="Logo Instagram"
                                height="30px"

                                style="
                                /* color: #252525; */

                                filter: invert(0%) sepia(7%) saturate(18%) hue-rotate(330deg) brightness(95%) contrast(82%);
                                "
                                >

                            </a>
                        </li>

                        <li>
                            <a href="https://www.instagram.com/kkn.negerijemanten/" target="_blank">
                                <img src="/Web Sampah/img/logo-tiktok.svg" alt="Logo Tiktok"
                                height="30px"

                                style="
                                /* color: #252525; */

                                filter: invert(7%) sepia(7%) saturate(18%) hue-rotate(330deg) brightness(95%) contrast(82%);
                                "
                                >
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/kkn.negerijemanten/" target="_blank">
                                <img src="/Web Sampah/img/logo-youtube.svg" alt="Logo Youtube"
                                height="30px"

                                style="
                                /* color: #252525; */

                                filter: invert(0%) sepia(7%) saturate(18%) hue-rotate(330deg) brightness(95%) contrast(82%);
                                "
                                >
                            </a>
                        </li>
                        <li>
                            <a href="https://kknnegerijemanten.carrd.co/" target="_blank">
                                <img src="/Web Sampah/img/logo-carrd.svg" alt="Logo Carrd"
                                height="30px"

                                style="
                                /* color: #252525; */

                                filter: invert(7%) sepia(7%) saturate(18%) hue-rotate(330deg) brightness(95%) contrast(82%);
                                "
                                >
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <hr class="footer-vertical">
            </div>
                <div class="right-footer">
                <img src="/Web Sampah/img/logo-vertical.svg" alt="Logo Kelompok 186"
                height="200px"

                style="
                /* color: #252525; */

                filter: invert(100%) sepia(7%) saturate(18%) hue-rotate(330deg) brightness(95%) contrast(82%);
                "
                >
            </div>
        </div>
        <hr class="footer-horizontal">
        <div class="bottom-footer">
            <p>&#169 Kelompok 186 | All Rights Reserved</p>
        </div>
    </footer>

    <script>
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let interval = null;

        document.querySelector(".nav-item1").onmouseover = event => {  
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                return event.target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
            clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
        }

        document.querySelector(".nav-item2").onmouseover = event => {  
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                return event.target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
            clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
        }

        document.querySelector(".nav-item3").onmouseover = event => {  
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                return event.target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
            clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
        }

        document.querySelector(".nav-item4").onmouseover = event => {  
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                return event.target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
            clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
        }

        document.querySelector(".footer-item1").onmouseover = event => {  
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                return event.target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
            clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
        }

        document.querySelector(".footer-item2").onmouseover = event => {  
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                return event.target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
            clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
        }

        document.querySelector(".footer-item3").onmouseover = event => {  
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                return event.target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
            clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
        }

        document.querySelector(".footer-item4").onmouseover = event => {  
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                return event.target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
            clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
        }
    </script>
</body>
</html>