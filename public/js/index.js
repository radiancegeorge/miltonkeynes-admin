const navBar= document.querySelector('.main');
const navBtn = document.querySelector('.close-nav');
navBtn.addEventListener('click', e =>{
    navBar.classList.toggle('switch-nav-display');
    navBtn.classList.toggle('arrow-out-more');
    navBtn.classList.add('rotate-180')
});
const editorContainer = document.querySelector('.editor');
if(editorContainer){
    const placeholder = editorContainer.dataset.placeholder;
    const options = {
        placeholder,
        theme: "snow",
        module: {
            syntax: true
        }
    }
    const editor = new Quill(editorContainer, options);
    const form = document.querySelector('.new-message');
    if(form){
        form.addEventListener('submit', e => {
            e.preventDefault();
            const qlEditor = document.querySelector('.ql-editor');
            const texts = qlEditor.innerHTML;
            // console.log(texts)
            if(texts.trim() !== ''){
                form.message.value = texts;
                // console.log(form.message.value)
                form.submit()
            }
        })
    }
}
const clearServerMessages = document.querySelector('.clear-server-messages');
if(clearServerMessages){
    clearServerMessages.addEventListener('click', e => {
        const serverMessages = document.querySelector('.server-messages');
        serverMessages.classList.add('d-none');
    })
}
window.addEventListener('load', e =>{
    const right = document.querySelector('.right');
    const nav = document.querySelector('nav');
    const navWidth = nav.clientWidth;
    right.style.marginLeft = (navWidth - 1) + 'px';
})


const userTable = $('.users-table');
if(userTable){
    userTable.DataTable();
    console.log(userTable)
}