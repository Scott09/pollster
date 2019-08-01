
$(() => {

  $('#CopyButton').click(()=> {
    console.log('hello');


    var Url = document.createElement("textarea");
    Url.innerHTML = window.location.href;
    // Copied = Url.createTextRange();
    // Copied.execCommand("Copy");
    Url.setAttribute("id","Copy")
    $("body").append(Url);
    const input = document.getElementById('Copy');
    input.select();
    document.execCommand("copy")
    console.log(Url)
    $('#Copy').remove();
    alert("Copied");
  })
});

