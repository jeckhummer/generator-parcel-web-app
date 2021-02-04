import * as React from "react";
<% if (semantic) { %>
import { Header, Icon } from 'semantic-ui-react';
<% } %>

const App: React.SFC = () => (
    <% if (semantic) { %>
    <>
        <br />
        <Header as='h1'>
            This is project generated by parcel-web-app generator!
        <Icon name="hand peace outline" />
        </Header>
    </>
    <% } else { %>
    <p>This is project generated by parcel-web-app generator!</p>
    <% } %>
);

export default App;