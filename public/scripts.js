$(document).ready(() => {
  getItems()
})

const getItems = async () => {
  const itemData = await fetch('/api/v1/items')
  const itemJson = await itemData.json()
  const showItems = itemJson.map( item => {
    $('.item-area').append(`
      <div id=${item.id} class="item-card">
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
      <div id=${itemName.id} class="item-card">
        <h4>Item-Name: ${itemName}</h4>
        <button class="delete-btn">
          Delete
        </button>
      </div>
    `)
  $('.add-item').val('')
}

const deleteItem = async (event) => {
  const id = $(event.target).closest('.item-card').attr('id')

  const deleteItemData = await fetch(`/api/v1/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // .then(response => response.json())
  .catch(error => console.log(error));

  $(event.target).closest('.item-card').remove()
}


$('.add-btn').on('click', postItems)
$('.item-area').on('click', '.delete-btn', (event) => deleteItem(event))

