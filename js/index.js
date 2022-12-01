document.addEventListener('DOMContentLoaded', (e) => {
 const form = document.getElementById('github-form')
 const userList = document.getElementById('user-list')
 const repoList = document.getElementById('repos-list')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const user = e.target[0].value

  fetch(`https://api.github.com/search/users?q=${user}`)
  .then((resp) => resp.json())
  .then((data) =>  data.items.map(user => renderUserInfo(user)))

  const renderUserInfo = (user) => {
    const card = document.createElement('div')
    card.className = 'card'

    const userName = document.createElement('li')
    userName.textContent = user.login
    userName.addEventListener('click', (e) => endpoints(user.login))

    const userAvatar = document.createElement('img')
    userAvatar.src = user.avatar_url
    const userURL = document.createElement('p')
    userURL.className = 'userUrl'
    userURL.innerHTML = user.html_url

    card.append(userName, userAvatar, userURL)
    userList.append(card)
    }
  }
)

const endpoints = (user) => {
console.log("endpoints function has been hit")
  fetch(`https://api.github.com/users/${user}/repos`)
  .then((resp) => resp.json())
  .then((data) => data.forEach(repo => renderRepoInfo(repo)))
}

const renderRepoInfo = (repo) => {
  const repocard = document.createElement('div')
  repocard.className = 'repoCard'

  const repoEndPointName = document.createElement('a')
  repoEndPointName.textContent = repo.name

  console.log(repoEndPointName)

  repocard.append(repoEndPointName)
  repoList.append(repocard)
}

})
