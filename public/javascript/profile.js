async function getFollowingIds(username) {

    const followIdArray = []

    const response = await fetch(`/api/users/username/${username}`)

    if (response.ok) {
        const data = await response.json();

        for (let i = 0; i < data.followings.length; i++) {
            followIdArray.push(data.followings[i].id)
        }

        return followIdArray
    }
}

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
else {

    const username = $('#profile-username').text()

    getFollowingIds(username)

        .then((followIdArray) => {

            for (let i = 0; i < followIdArray.length; i++) {
                const followId = $('#follow-id').text()

                const unfollowBtn = $('<button>')
                    .addClass('btn')
                    .text('-Unfollow')
                    .attr({
                        type: 'button',
                        id: 'unfollow-btn'
                    })
                    .on('click', async function () {
                        const response = await fetch(`/api/followings/${followId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        if (response.ok) {
                            
                            // window.location.reload();
                        } else {
                            alert(response.statusText)
                        }
                    })

                let unfollowBtnDivEl = $('#unfollow-btn-div-' + followIdArray[i])

                $(unfollowBtnDivEl).append(unfollowBtn);
            }
        })
}

