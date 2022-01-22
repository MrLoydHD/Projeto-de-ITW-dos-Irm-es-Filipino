//Storage your register information

function Sugestoes() {
    var self = this
    self.nome = ko.observable()
    self.email = ko.observable()
    self.password = ko.observable()
    self.perfil = ko.observableArray()

    self.submeter = function() {
        alert("cona")
        var obj = {}
        obj.nome = self.nome()
        obj.email = self.email()
        obj.password = self.password()
        self.perfil.push(obj)
        self.updateLocalStorage("perfil", self.perfil());
    }

    self.updateLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
    }

    self.init = function() {
        if (localStorage.getItem("perfil") !== null) {
            self.perfil(JSON.parse(localStorage.getItem("perfil")))

        } else {
            self.perfil([])
        }
    }
    self.init()
}


s = new Sugestoes
ko.applyBindings(s)

$('#submeter').click(function(e) {
    e.preventDefault();
    s.submeter();
});

//

(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                if (form.checkValidity() === false) {
                    event.stopPropagation();
                } else {
                    s.submeter()
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();