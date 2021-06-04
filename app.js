const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const {
    head
} = require('lodash');

const app = express();

const homeStartingContent = "The journal—it’s one of those things that can be as useless as a piece of trash, or one of the most valuable things you’ve ever owned…It all depends on what you fill that journal’ s pages with. Journaling— when done regularly— almost always leads to fresh, new insights and ideas that can absolutely transform your life. To get through tough times, to achieve your goals, maintain your sanity, or to foster your creative efforts(like fleshing out topic ideas for articles, podcasts or talks). Whichever one of these journaling ideas you decide to use, just do promise this: you’ ll actually use them.Because they’ ll only work if you work them… ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisquxe eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.set("view engine", 'ejs');

app.get("/", function (req, res) {
    res.render("index.ejs", {
        heading: "Home",
        content: homeStartingContent,
        postList: posts
    });

});
app.get("/about", function (req, res) {
    res.render("index.ejs", {
        heading: "About",
        content: aboutContent,
        postList: []
    });

});

app.get("/contact", function (req, res) {
    res.render("index.ejs", {
        heading: "Contact",
        content: contactContent,
        postList: []
    });

});
app.get("/compose", function (req, res) {
    res.render("compose.ejs", {
        heading: "Compose"
    });
});
app.get("/posts/:postNumber", function (req, res) {
    let title = _.lowerCase(req.params.postNumber);

    posts.forEach(function (post) {
        let temp = _.lowerCase(post.title);
        if (title === temp) {
            res.render("blogPost.ejs", {
                heading: post.title,
                content: post.data
            });
        }
    });
});
app.post("/compose", function (req, res) {
    const post = {};
    post.title = req.body.title;
    post.data = req.body.postData;
    posts.push(post);

    res.redirect("/");
});
app.post("/delete", function (req, res) {
    let toBeDeletedPost = req.body.submit;
    posts.forEach((post, i) => {
        if (post.title === toBeDeletedPost) {
            delete posts[i];
        }
    });

    res.redirect("/");
});
app.listen(process.env.PORT || 3000, function () {
    console.log("Server running");
});