const $submitBtn = $(".submit-btn"),
    $input = $("input"),
    $devourBtns = $(".devour-btn"),
    $deleteBtns = $(".delete-btn"),
    $regurgitateBtns = $(".regurgitate-btn"),
    $errorMsg = $('.error-msg');

$input.val(""); 

async function post(data) {
    return await $.ajax("/api/burgers/", {
        method: "POST",
        data: data,
    });
}
async function update(id, data) {
    return await $.ajax("/api/burger/" + id, {
        method: "PUT",
        data: data,
    });
}
async function trash(id) {
    return await $.ajax("/api/burger/" + id, {
        method: "DELETE",
    });
}

async function updateHandler() {
    let id = $(this).data("id");
    if ($(this).text() === "Devour!") await update(id, { devoured: 1 });
    else await update(id, { devoured: 0 });
    location.reload();
}

async function deleteHandler() {
    let id = $(this).data("id");
    await trash(id);
    location.reload()
}
$input.on('keypress', () => $errorMsg.hide())

$submitBtn.on("click", async (event) => {
    $errorMsg.hide();
    event.preventDefault();
    let input = $input.val(),
        inputArr = input.split(' '),
        tooLongBoolean = inputArr.map(word => {
            if (word.split('').length > 35) return true;
            else return false
        }),
        tooLongFilter = tooLongBoolean.filter(b => b === true);
    console.log(inputArr);
    console.log(tooLongBoolean);
    console.log(tooLongFilter);
    if (tooLongFilter.length > 0) {
        $errorMsg.show();
        $errorMsg.text('Sorry! No single word in the name can be longer than 25 characters.');
        return;
    } else if (!input) return;

    $errorMsg.hide();
    
    let data = {
        name: input
    };

    await post(data);
    location.reload();
});

$devourBtns.on("click", updateHandler);
$regurgitateBtns.on("click", updateHandler);
$deleteBtns.on("click", deleteHandler);
