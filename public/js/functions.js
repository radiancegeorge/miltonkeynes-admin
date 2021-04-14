window.addEventListener('load', e =>{
    const blockBtn = document.querySelectorAll('.activate-deactivate');
    blockBtn.forEach(btn=>{
        btn.addEventListener('click', async (e) => {
            const tableRow = e.target.parentElement.parentElement;
            const user_id = tableRow.children[0].textContent;
            const status = tableRow.children[3];
            
            const response = await fetch('/block', {
                method: 'post',
                body: JSON.stringify({
                    user_id
                }),
                headers: {
                    "content-type": "application/json"
                }
            });
            const responseObj = await response.json();
            if(responseObj){
                console.log(responseObj)
                const {newValue} = responseObj
                status.textContent = newValue ? "Active" : " Not active"
            }
        })
    })
})