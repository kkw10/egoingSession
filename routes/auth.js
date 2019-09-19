const express = require('express');
const router = express.Router();
const fs = require('fs');
const template = require('../lib/template');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

const authData = {
  email: 'test123@gmail.com',
  password: '123',
  nickname: 'tester'
}

router.get('/login', (req, res) => {
  let title = 'WEB - login';
  let list = template.list(req.list);
  let html = template.HTML(title, list, `
    <form action="/auth/login_process" method="post">
      <p><input type="text" name="email" placeholder="email"></p>
      <p><input type="password" name="pwd" placeholder="password"></p>
      <p>
        <input type="submit" value="login">
      </p>
    </form>
  `, '');
  res.send(html);
})

router.post('/login_process', (req, res) => {
  let post = req.body;
  let email = post.email;
  let password = post.pwd;
  
  if(email === authData.email && password === authData.password) {
    res.send('Welcome!');
  } else {
    res.send("Who are you?")
  }

  //res.redirect(`/topic/${title}`)  
})
  

  
//   router.get('/update/:pageID', (req, res) => {
//     let filteredId = path.parse(req.params.pageID).base;
//     fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
//       let title = req.params.pageID;
//       let list = template.list(req.list);
//       let html = template.HTML(title, list,
//         `
//         <form action="/topic/update_process" method="post">
//           <input type="hidden" name="id" value="${title}">
//           <p><input type="text" name="title" placeholder="title" value="${title}"></p>
//           <p>
//             <textarea name="description" placeholder="description">${description}</textarea>
//           </p>
//           <p>
//             <input type="submit">
//           </p>
//         </form>
//         `,
//         `<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`
//       );
//         res.send(html)
//     });
//   })
  
//   router.post('/update_process', (req, res) => {
//     let post = req.body;
//     let id = post.id;
//     let title = post.title;
//     let description = post.description;
//     fs.rename(`data/${id}`, `data/${title}`, function(error){
//       fs.writeFile(`data/${title}`, description, 'utf8', function(err){
//         res.redirect(`/topic/${title}`)
//       })
//     });
//   })
  
//   router.post('/delete_process', (req, res) => {
//     let post = req.body;
//     let id = post.id;
//     let filteredId = path.parse(id).base;
//     fs.unlink(`data/${filteredId}`, function(error){
//       res.redirect('/')
//     })
//   })
  
//   router.get('/:pageID', (req, res, next) => {
//     fs.readdir('./data', function(err, filelist){
//       let filteredId = path.parse(req.params.pageID).base;
//       fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
//         if(!err) {
//           let title = req.params.pageID;
//           let sanitizedTitle = sanitizeHtml(title);
//           let sanitizedDescription = sanitizeHtml(description, {
//             allowedTags:['h1']
//           });
//           let list = template.list(filelist);
//           let html = template.HTML(sanitizedTitle, list,
//             `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
//             ` <a href="/topic/create">create</a>
//               <a href="/topic/update/${sanitizedTitle}">update</a>
//               <form action="/topic/delete_process" method="post">
//                 <input type="hidden" name="id" value="${sanitizedTitle}">
//                 <input type="submit" value="delete">
//               </form>`
//           );
//           res.send(html)
//         } else {
//           next(err)
//         }
//       });
//     });
//   })

  module.exports = router;