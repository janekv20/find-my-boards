async function followingBtnHandler(btn) {

    const username = btn.textContent;

    const response = await fetch(`/api/users/username/${username}`)

    if (response.ok) {
        const data = await response.json();

        document.location.replace(`/profile/${data.id}`)
    } else {
        alert(response.statusText)
    }

}
