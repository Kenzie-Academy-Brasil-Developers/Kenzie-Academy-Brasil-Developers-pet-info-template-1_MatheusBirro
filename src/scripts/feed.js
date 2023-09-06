import { renderAllPosts, renderPostModal } from "./render.js";
import { createPostRequest, deletePostRequest, editPostRequest, getCurrentUserInfo, getPostId } from "./requests.js";

async function renderMenu() {
  const userInfo = await getCurrentUserInfo();
  const h2 = document.querySelector('.user__uniquename ')
  const imgProfile = document.querySelector('.user__image')

  h2.innerText = `@${userInfo.username}`
  imgProfile.src = `${userInfo.avatar}`
}

function showUserMenu() {
  const userAction = document.querySelector(".user__image");
  const menu = document.querySelector(".user__logout");

  const logOut = document.querySelector('.logout__button')

  //Renderiza todo o corpo do menu
  renderMenu()

  userAction.addEventListener("click", (e) => {
    menu.classList.toggle("hidden");
  });

  logOut.addEventListener('click', () => {
    localStorage.removeItem("@petinfo:token")
    location.replace(`../../index.html`)
  })
}

function closeEditModal(modal) {
  const closeBtn = document.querySelector('.close_edit-modal');

  closeBtn.addEventListener('click', () => {
    modal.close()
  })
}

async function handleEditPost() {
  const editBtn = document.querySelector('#edit__button');
  const modal = document.querySelector('#modal__edit-post');
  const titulo = document.querySelector('#titulo__edit-post');
  const content = document.querySelector('#body__edit-post');

  editBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const bodyEdit = {
      title: titulo.value,
      content: content.value
    };
    
    const edit = await editPostRequest(editBtn.dataset.id, JSON.stringify(bodyEdit))

    showDash()

    modal.close()

  })
}

async function editPost() {
  const editPublicationBtns = document.querySelectorAll('.post__button--edit');
  const editModal = document.querySelector('#modal__edit-post')

  const titulo = document.querySelector('#titulo__edit-post');
  const content = document.querySelector('#body__edit-post');
  
  for (let i = 0; i < editPublicationBtns.length; i++) {
    const editBtn = editPublicationBtns[i];
    editBtn.addEventListener('click', (async(e) => {
          const editBtnModal = document.querySelector('#edit__button');
          editBtnModal.dataset.id = e.target.dataset.id;
          const post = await getPostId(editBtnModal.dataset.id);
              titulo.value = post.title
              content.value = post.content
      editModal.showModal()
      closeEditModal(editModal)
    }))
  }
}

async function handleDeletePost() {
  const deleteBtn = document.querySelector('.delete__button-modal');
  const modal = document.querySelector('#modal__delete-post');

deleteBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    
    const deletePost = await deletePostRequest(deleteBtn.id)

    showDash()

    modal.close()

  })
}

function deletePost() {

  const deletePublicationBtns = document.querySelectorAll('.post__button--delete');
  const deleteModal = document.querySelector('#modal__delete-post');


  for (let i = 0; i < deletePublicationBtns.length; i++) {
    const deleteBtn = deletePublicationBtns[i];

    deleteBtn.addEventListener('click', async(e) => {
      const deleteBtnModal = document.querySelector('.delete__button-modal');
      deleteBtnModal.id = e.target.dataset.id
      deleteModal.showModal()

      const closeModal = document.querySelector('.close_modal-delete');
      const cancelModal = document.querySelector('#cancel__button-delete');

      closeModal.addEventListener('click', () => {
        deleteModal.close()
      })
      cancelModal.addEventListener('click', (e) => {
        e.preventDefault()
        deleteModal.close()
      })
    })
  }
}

function handlePublish() {
  const publishBtn = document.querySelector('#publish__button');
  const modal = document.querySelector('#modal__create-post')

  // console.log(publishBtn);
  publishBtn.addEventListener('click', async (e) => {
    e.preventDefault()

    const titlePost = document.querySelector('#titulo__create-post')
    const contentPost = document.querySelector('#content__create-post')

    const bodyPost = {
      title: titlePost.value,
      content: contentPost.value
    }

    if (titlePost.value === "" ) {   
      console.log("Digite um titulo");
      return
    } else if(contentPost.value === "") {
      console.log("Digite uma descrição");
      return
    } else{
      const post = await createPostRequest(JSON.stringify(bodyPost));

      modal.close()
    
      await showDash()
    
      titlePost.value = "";
      contentPost.value = "";
    }
  })
}

function newPost() {
  const btnNewPost = document.querySelector('#user__newpost');
  const modal = document.querySelector('#modal__create-post')

  btnNewPost.addEventListener('click', () => {
    modal.showModal();

    const closeBtn = document.querySelector('.close_modal');
    const cancelBtn = document.querySelector('#cancel__button');

    closeBtn.addEventListener('click', () => {
      modal.close()
    })

    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const inputs = document.querySelectorAll('input')
      inputs.forEach(input => {
        input.value = ""
      });
    })
  })
}

async function showDash() {
  
  await renderAllPosts()
  
  editPost()

  deletePost()

  handleAccessPost()
}

function handleAccessPost() {
  const accessBtns = document.querySelectorAll('.post__open')

  for (let i = 0; i < accessBtns.length; i++) {
    const accessBtn = accessBtns[i];

    accessBtn.addEventListener('click', async() => {
      const modal = document.querySelector('#modal__access-post')
      modal.innerHTML = ""
      const post = await getPostId(accessBtn.dataset.id)
      modal.appendChild(await renderPostModal(post))
      modal.showModal()

      const closeBtn = document.querySelector('.close_btn-modal')

      closeBtn.addEventListener('click', ()=> {
        modal.close()
      })
    })
  }
}

async function main() {
  // Adiciona os eventos de click ao menu flutuante de logout
  showUserMenu();

  // Renderiza todos os posts no feed (render.js)
  await showDash();

  // Abre um modal
  newPost();

  handlePublish();

  handleEditPost();

  handleDeletePost();
}

main();