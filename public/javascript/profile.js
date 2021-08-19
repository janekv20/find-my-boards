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

// run an if statement to check to see if the last word in the URL path isn't profile
// if not equal to profile then add the follow button
const urlLastWord = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
const following_username = $('#profile-username').text();

if (urlLastWord !== 'profile') {
    const followBtn = $('<button>')
        .addClass('btn')
        .text('+Follow')
        .attr({
            type: 'button',
            id: 'follow-btn'
        })
        .on('click', async function () {
            const response = await fetch('/api/followings', {
                method: 'POST',
                body: JSON.stringify({
                    following_username
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('You started following ' + following_username + '!')
            } else {
                alert(response.statusText)
            }
        })

    $('#follow-user-div').append(followBtn);
}