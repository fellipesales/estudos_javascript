var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

buttonElement.onclick = GetRepositories;

function GetRepositories() {
    var user = inputElement.value;

    if (user === '') {

        alert('Digite um nome de usuário git');

    }
    else {

        ListRepositories(user);
    }
}

function Render(name) {

    console.log(name);

    var reposElement = document.createElement('li');
    var reposText = document.createTextNode(name);

    reposElement.appendChild(reposText);
    listElement.appendChild(reposElement);

}

function ClearList() {
    listElement.innerHTML = '';
}

function ListRepositories(user) {

    listElement.innerHTML = '';

    Render('Carregando');

    axios.get('https://api.github.com/users/' + user + '/repos')
        .then(function (response) {

            var arrayRepos = response.data;

            ClearList();

            for (repos of arrayRepos) {
                Render(repos.name);
            }

        })
        .catch(function (error) {
            if (error.response.status === 404) {
                ClearList();
                alert('Usuário não existe!')
            }

        });

}