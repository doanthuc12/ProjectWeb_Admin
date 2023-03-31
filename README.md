# RN26-thucntd

RN26

# Cài đặt: Visual Studio Code

### Download:

> https://code.visualstudio.com/

### Cài đặt các extensions:

- Auto Close Tag
- Auto Rename Tag
- HTML CSS Support
- HTML Snippets
- Live Server
- Prettier - Code formatter
- Visual Studio IntelliCode
- Bracket Pair Colorizer 2
- Color Highlight
- Dracula Official (theme)
- Dark Molokai Theme

## Session 02 - Practice & Homeworks

- Vẽ Wireframe: https://www.sketch.com/s/bab4fc21-b247-47e7-8b30-6cf82277ebd2?fbclid=IwAR0pLTvJCq8QdGe0fZVkLXX9ElWW-Ct52tuP6tscmlf9E9YG_Fambo9b7vM

## Một số công cụ vẽ Wireframe + Mockup

- https://moqups.com/
- ADOBE XD (https://www.adobe.com/sea/products/xd.html)
- FIGMA (https://www.figma.com/downloads)

## Một số công cụ về màu

- https://colorhunt.co/
- https://coolors.co/
- https://colors.eva.design/
- https://mycolor.space/
- https://material.io/resources/color/#!/?view.left=0&view.right=0
- https://flatuicolors.com/
- https://color.adobe.com/create/color-wheel
- https://colorpalettes.net/
- https://www.materialpalette.com/

## Một số Website về thiết kế:

-https://collectui.com/

## Một số website cung cấp ảnh chất lượng cao miễn phí

- https://pixabay.com/
- https://unsplash.com/

# GIT

## Install

https://git-scm.com/downloads

- Check cài đăt thành công:

* Window: open cmd -> git -v

MAC:

- open terminal
- Install brew: https://docs.brew.sh/Installation
- Install git: brew install git
- Check git: git -v

## Create repository github

- Login: https://github.com/
- Tạo 1 repository

## Clone repository

- Open VScode
- Open folder code
- Open terminal vscode tại folder code
- Nhập: git clone <HTTPS của repository>

* Lưu ý: Cần phải kiểm soát chặt chẽ cấu trúc folder code.

- Repo bản thân tự tạo: dùng để code (code nhớ FORMAT)
- Repo document: Yêu cầu không thay đổi code. Chỉ dùng git pull để lấy tài liệu.

## Step git push code

- Lần đầu:

* Khởi tạo git: git init
* Config email : git config --global user.email '<email>'
* Config username : git config --global user.name '<name>'
* Add toàn bộ file change: git add .
* Tạo commit mô tả: git commit -m 'homework1'
* git push

- Những lần sau:

* Add toàn bộ file change: git add .
* Tạo commit mô tả: git commit -m 'homework1'
* git push

## Run HTML file:

- MAC: open index.html
- Window: start index.html

* NOTE:

- Có thể chọn RUN -> START (F5)
- Open folder -> click double vào tên file html.

#BOOTSTRAP
Cách 1: chèn link online trực tiếp từ web: https://getbootstrap.com/docs/5.2/getting-started/introduction/

- Phần Head:
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>

- Phần Body (ở cuối)
  <script
        src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"
      ></script>

Cách 2: Chèn link ở thư mục Bootstrap đã tải về:

- Phần Head: <link
      rel="stylesheet"
      href="./bootstrap-4.6.2-dist//css/bootstrap.min.css"
    />
- Phần Body (cuối)
    <script src="./bootstrap-4.6.2-dist/js/bootstrap.bundle.min.js"></script>
    <script src="./bootstrap-4.6.2-dist/js/bootstrap.min.js"></script>

THƯ VIỆN MỞ RỘNG:

## https://github.com/lugolabs/circles

## https://plyr.io/

## https://owlcarousel2.github.io/OwlCarousel2/

## https://fancyapps.com/docs/ui/fancybox/

## https://masonry.desandro.com

## https://www.chartjs.org/docs/latest/getting-started/

#ICON

- Chèn link source: <script src="https://kit.fontawesome.com/042e59ddf7.js" crossorigin="anonymous"></script>
- Web: fontawesome.com

#ANIMATION

- C1: CHÈN LINK TRỰC TIẾP VÀO <HEAD>: https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css
- C2: Mở link đã chèn trong C1 --> copy path --> tạo file ANIMATION.MIN.CSS --> dán path vào và link với file HTML

#Interview:
Css: thứ tự ưu tiên Imporrtant - Inline - in/external
JS:
Có bn cách clone một obj

- clone nông và clone sâu
- closure?

hoiiting JS?

API:
promiseAll:

---

REACTJS

-Tạo React-app: open link: https://create-react-app.dev/docs/getting-started/

- Copy link: Creating a TypeScript app: npx create-react-app my-app --template typescript
- Mở Intergrated Terminal: paste link --> đổi my-app thành 2-example (tên app- có thể đặt tự do) --> Enter

-Tất cả file đều thực hiện trong file src

Run file React: mở terminal file cần chạy --> nhập nmp start

COMPONENTS / PROPS
-Components cha (App.tsx)

- Gọi component con:
  -Truyền dữ liệu:
- Class component: tsrce
<h4>{this.props.userProps.address}</h4>
+Functional component: rfce
<h4>{userProps.address}</h4>

- Key: định danh phần tử --> không được trùng key
  VD:
  key={`user1-${index}`}
  key={`user2-${index}`}

ICON:

- Link icon: https://react-icons.github.io/react-icons/icons?name=fc
- import { AiOutlineLike, AiFillLike} from "react-icons/ai"
- Sử dụng như một cpn <AiOutlineLike/>

  CRUD (CREATE - READ - UPDATE - DELETE) (GET - PUT - POST -DELETE)

  ***

  NODEJS:
  Các bước cài đặt sử dụng node express (thực hiện trong terminal folder đã tạo):

- npm i express --save-dev
- npm i
- npm start

Lệnh render file node:
Ctrl + C --> cancel file đang chạy trc đó
npm start

//tránh console log data 2 lần
File index.js --> Fragment

// Mongoose Datatypes:
// https://mongoosejs.com/docs/schematypes.html
