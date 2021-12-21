//tri
function buttonClick(buttonId) {
    const x = document.getElementById('ButtonId');
    document.getElementById("result").value = x.value
}

function onClick() {

    // const x = document.getElementById('seven');
    // alert(x.value)

    // document.getElementById("result").value = x.value
    let one = document.querySelector("#seven");
    // one.addEventListener('click', function () { buttonClick(seven) })
    one.addEventListener('click', function () {
        // const x = document.getElementById('seven');
        // document.getElementById("result").value = x.value
        let input = document.getElementsByClassName("group-button").value
        input[0].value
    })

    let two = document.querySelector("#eight");
    // one.addEventListener('click', function () { buttonClick(seven) })
    two.addEventListener('click', function () {
        const x = document.getElementById('eight');
        document.getElementById("result").value = x.value
    })

}

