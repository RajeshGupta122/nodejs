<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="/socket.io/socket.io.js"></script>
<script>

    var socket = io.connect('http://localhost:3000');
    var room_names = ['Developers','Designers','Testers'];
    
    // on connection to server, ask for user's name with an anonymous callback
    socket.on('connect', function(){
        // call the server-side function 'adduser' and send one parameter (value of prompt)
        socket.emit('adduser', prompt("What's your name?"));
    });

    // listener, whenever the server emits 'updatechat', this updates the chat body
    socket.on('updatechat', function (username, data) {
        var val = '<div class="chat-widget-right"> <b>'+ username +' : </b>' + data +'  <small style="float:right">'+ time() + '</small></div>' ;

        $('#conversation').append(val );
        $('#conversation').last().focus();
        sound();
    });
    
    // listener, whenever the server emits 'updatechat', this updates the chat body
    socket.on('updatelog', function (username, data) {
        var val = '<li class="media log">' +
                        '<div  class="media-body"> '+ 
                            '<div class="media">' + 
                              '<div class="media-body">' +
                                '<small class="text-muted"> <b>' + username +' </b> '+ data  +'  <small style="float:right">'+ time() + '</small></small>' +
