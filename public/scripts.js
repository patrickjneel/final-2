$(document).ready(() => {
  getItems()
})

const getItems = async () => {
  const itemData = await fetch('/api/v1/items')
  const itemJson = await itemData.json()
  const showItems = itemJson.map( item => {
    $('.item-area').append(`
      <div class="item-card">
        <h4>Item-Name: ${item.name}</h4>
        <button class="delete-btn">
          Delete
        </button>
      </div>
    `)
  })
}

const postItems = async () => {
  const itemName = $('.add-item').val()
  
    fetch('/api/v1/items', {
    method: 'POST',
    body: JSON.stringify({name: itemName}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(items =>  {
    postItemDom(itemName)
  })
}

const postItemDom = (itemName) => {
$('.item-area').prepend(`
      <div class="item-card">
        <h4>Item-Name: ${itemName}</h4>
        <button class="delete-btn">
          Delete
        </button>
      </div>
    `)
  $('.add-item').val('')
}

const deleteItem = (event) => {
  const id = $(event.target).closest('.item-card').attr('class')
  console.log(id)
}

const deleteItemDom = (event) => {
  $(event.target).closest('.item-card').remove()
}


$('.add-btn').on('click', postItems)
$(document).on('click', '.delete-btn', deleteItem)

