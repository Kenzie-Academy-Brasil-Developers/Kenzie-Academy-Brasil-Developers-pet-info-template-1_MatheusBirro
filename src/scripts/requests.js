const baseUrl = "http://localhost:3333";
const token = JSON.parse(localStorage.getItem("@petinfo:token"));

const requestHeaders = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
};

// Informações de usuário logado
export async function getCurrentUserInfo() {
  const request = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  });
  const user = await request.json();

  return user;
}

// Listagem de posts
export async function getAllPosts() {
  const request = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: requestHeaders,
  });
  const posts = await request.json();
  return posts;
}

// Desenvolva as funcionalidades de requisições aqui
export async function getPostId(id) {
  const request = await fetch(`${baseUrl}/posts/${id}`, {
    method: "GET",
    headers: requestHeaders,
  });
  const posts = await request.json();
  return posts;
}

// Request de login
export async function loginTokenRequest(body){
  //Passa para a API os valores inseridos no input pelo usuário
  const token = await fetch(`${baseUrl}/login`,{method: 'POST',
  headers: requestHeaders,
  body: JSON.stringify(body),
  })
  .then(async(res) => {
    const request = await res.json()
    if (res.ok) {
      console.log("Login efetuado com sucesso");
      // Salvando no LocalStorage o valor do token recebido pela API
      localStorage.setItem('@petinfo:token', JSON.stringify(request.token))
      location.replace(`./src/pages/feed.html`)
      return request
    }else if(request.message.includes("email")){
      const wrongEmail = document.querySelector('#wrong-email');

      wrongEmail.classList.remove("hidden")
      
    }else if(request.message.includes("senha")){
      const wrongPassword = document.querySelector('#wrong-password');

      wrongPassword.classList.remove("hidden")
      
    }else{
      console.log(request.message);

      // FAZER A REQUISIÇÃO MAL SUCEDIDA ABAIXO DO LOCAL CORRETO
    }
  })
  return token
}

// Request da criação do usuário 
export async function createUserRequest(body){
  //Passa para a API os valores inseridos no input pelo usuário
  const user = await fetch(`${baseUrl}/users/create`,{method: 'POST',
  headers: requestHeaders,
  body: body,
  })
  .then(async(res) => {
    const request = await res.json()
    if (res.ok) {
      console.log("Cadastro efetuado com sucesso");
      // Retorna a pagina inicial
      setTimeout(() => {
        location.replace(`../../index.html`)
      },3000)
      // FAZER A TOAST
      return request
    }else{
      console.log("Cadastro não realizado, por favor tente novamente");
      // FAZER A TOAST
    }
  })
  return user
}

// Request da criação do Post
export async function createPostRequest(body){
  //Passa para a API os valores inseridos no input pelo usuário
  const post = await fetch(`${baseUrl}/posts/create`,{method: 'POST',
  headers: requestHeaders,
  body: body,
  })
  .then(async(res) => {
    const request = await res.json()
    if (res.ok) {
      console.log("Post efetuado com sucesso");      
      // FAZER A TOAST
    }else{
      console.log("post não realizado, por favor tente novamente");
      // FAZER A TOAST
    }
  })
  return post
}

// Request para deletar o Post pelo id
export async function deletePostRequest(id) {
  const deletePost = await fetch(`${baseUrl}/posts/${id}`,{method: 'DELETE',
  headers: requestHeaders,
  })
  .then(async(res) => {
    const request = await res.json()
    if (res.ok) {
      console.log("Post deletado com sucesso");      
      // FAZER A TOAST
      return request
    }else{
      console.log("post não deletado, por favor tente novamente");
      // FAZER A TOAST
    }
  })
  return deletePost
}

// Request de edição do Post pelo id
export async function editPostRequest(id, body){
  const edit = await fetch(`${baseUrl}/posts/${id}`,{method: 'PATCH',
  headers: requestHeaders,
  body: body,
  })
  .then(async(res) => {
    const request = await res.json()
    if (res.ok) {
      console.log("Editado com sucesso");      
      // FAZER A TOAST
      return request
    }else{
      console.log("Sua edição nao foi concluída, por favor tente novamente");
      // FAZER A TOAST
    }
  })
  return edit
}