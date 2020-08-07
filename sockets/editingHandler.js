module.exports = (event, socket) => {
  socket.on(event, async ({ listId, item, editing }, callback) => {
    /* Item being passed to all sockets looks like this 
      { 
        id: item_id, name: e.target.value,
        editing: { active: true, 
                   by: storedUser.username, 
                   id: storedUser.id } 
      }
    */
    socket.to(listId).emit('EDITING', { ...item, editing });
  });
};
