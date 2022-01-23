### Publish events

- Header and navigation
  - events.emit('nav');
    - app.js

- new item/ category
  - events.emit('newItem');
    -app.js

- Routes
  - events.emit('output', hash);
    - routes.js

### Subscribe to events
- Header and navigation
  - events.on('nav', init);
    - nav.js

- new item/ category
  - events.on('newItem', showAddChat);
    -controls.js

- Routes
  - events.on('output', ...);
    - NOT USED