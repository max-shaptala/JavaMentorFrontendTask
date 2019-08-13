const form = {
    init: function (url) {
        this.url = url;

        this.result = document.getElementById('result');

        let button = document.getElementById('load');
        let group = document.getElementById('group');
        button.addEventListener('click', () => this.load(group));
    },

    load: function (group) {
        fetch(`${this.url}?group=${group.value}`)
            .then((res) => this.display(res));
    },

    display: function (res) {
        res.json()
            .then(json => this.list(json.data));
    },

    list: function (data) {
        this.result.innerHTML = '';
        data.filter(item => item.hasOwnProperty('logo'))
            .forEach(item => this.addItem(item));
    },

    addItem: function (item) {
        let li = document.createElement('div');
        let img = document.createElement('img');
        img.src = item.logo;
        img.alt = item.name;

        let descr = document.createElement('ul')
        let name = document.createElement("li");
        name.appendChild(document.createTextNode(item.name));
        descr.appendChild(name);

        let created = document.createElement('li');
        created.appendChild(document.createTextNode(`Основан в ${item.year}`));
        descr.appendChild(created);

        let projects = document.createElement('li');
        projects.appendChild(document.createTextNode(`${item.projectsCount} проектов на GitHub`));
        descr.appendChild(projects);

        let docs = document.createElement('li');
        let link = document.createElement('a');
        link.appendChild(document.createTextNode('Документация'));
        link.href = item.docs;
        docs.appendChild(link);
        descr.appendChild(docs);

        li.appendChild(img);
        li.appendChild(descr);

        this.result.appendChild(li);
    }
};

form.init('https://frontend-test-api.alex93.now.sh/api/languages');