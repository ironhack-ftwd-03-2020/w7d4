## Routing in React

Although we are building a Single Page Application our users expect certain behaviour from a normal website. For example they want to be able to use the forward and the back button.

So we need also in the frontend the ability to use some kind of routing functionality. 

For that we use the react router package. There are three versions React Router, the core package and React Router Dom for the web and also React Router Native.

```bash
$ npm install react-router-dom
```

With this router we can navigate between different components, change the browser URL and modify the browser history

The React Router is based on three main components:

Router - This component keeps the User Interface in sync with the URL,

Link - Renders a navigation link. (basically an <a> tag, but they change the URL without refreshing the page),

Route - Renders a UI component depending on the URL.
The first thing we need to do is to choose a router implementation; for web applications, we have two options:

<BrowserRouter> - Uses the HTML5 History API*,
<HashRouter> - Uses the hash portion of the URL. (Only for older browsers that don’t support the HTML5 History API, so let’s focus on the <BrowserRouter>)

The History API is an object that lets us manage the current location via history.location as well as previous locations. Think of the location property of the object as an array. The current location is the last item on the array and we manipulate the array through methods such as history.push() or history.replace(). Whatever manipulation is made on the array will trigger a page transition to the current location. This is what happens behind the scene when using Link as we will see soon.
Dynamic Routing

The example app has four components: Home.js, About.js, Education.js and Experience.js

Education.js and Experience.js are contained in About.js.

In index.js we have to import BrowserRouter and wrap our root compnent app.js with it.
```js
//src/index.js
//
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
```
The main purpose of the Router component is to create a history object to keep track of the location (URL) if the location changes because we navigated to a new site, the child component gets rerendered.

Let's add a Navbar.js component that contains links to our different sites.

For the links we use the Link component that we import from react-router-dom

```js
// src/Navbar.js
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav-style">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};
```

Finally we want to add Routes to the different components to App.js.

```js
// src/App.js
//
import Home from "./Home";
import About from "./About";
import { Route, Switch } from "react-router-dom";

//
function App() {
  return (
    <div className="App">
      {/* <Home />
      <About /> */}
      <Navbar />
      {/* Switch will only render one route, the first route that matches the path 
          - withour it the Notfound component would be rendered everytime*/}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        {/* <Route exact path="/projects" component={Projects} />
        <Route exact path="/projects/:id" component={ProjectDetail} />
        <Route component={NotFound} /> */}
      </Switch>
    </div>
  );
}
```

Let's add a Projects.js component that shows the person's projects.

See that we are exporting two things here: The component itself and all the products. This will become important later.

```js
// src/Projects.js
import React from "react";
import { Link } from "react-router-dom";

const myProjects = [
  {
    id: "1a",
    name: "The Frogger Clone",
    year: 2017,
    technologies: "JavaScript, jQuery",
    description: "The first project game clone."
  },
  {
    id: "2b",
    name: "iTravel",
    year: 2017,
    technologies: "Mongo DB, ExpressJS, NodeJS, JavaScript, HTML, CSS",
    description:
      "Web App that allows logged in users to share their experiences about travel destinations."
  },
  {
    id: "3c",
    name: "The Plan",
    year: 2017,
    technologies:
      "Mongo DB, ExpressJS, Angular2, NodeJS, JavaScript, HTML, CSS",
    description:
      "Web App that allows logged in users to plan your next activity with your friends or business partners."
  }
];

const Projects = () => {
  return (
    <div>
      <h2>Projects:</h2>
      {myProjects.map(eachProject => {
        return (
          <div key={eachProject.id}>
            <h3>
              {eachProject.name}
            </h3>
            <h4>{eachProject.technologies}</h4>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export { Projects, myProjects };

```

And let's add a link to the Projects component in the Navbar.

```js
//src/Navbar.js
//
const Navbar = () => {
  return (
    <nav className="nav-style">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
      </ul>
    </nav>
  );
};
```

And lastly we have to add the route to the Router in the App.js

```js
//src/App.js
//
import { Projects } from "./Projects";
<Switch>
  <Route exact path="/" component={Home} />
  <Route exact path="/about" component={About} />
  <Route exact path="/projects" component={Projects} />
</Switch>
```

Now we want to be able to click on a project's title and be taken to a detail view of that project.
We first wrap the Project title in a link and add the id to the url.

```js
// src/Projects.js
//
<h3>
  <Link to={`/projects/${eachProject.id}`}>{eachProject.name}</Link>
</h3>
//
```

If we now click the URL changes dynamically.

Now we add the ProjectDetail.js component that shows the details of a project

Because we are wrapping everything with the Browser Router we automatically have access to the URL parameters via the props.

```js
// src/ProjectDetail.js
import React from "react";
import { myProjects } from "./Projects";
import { Link } from "react-router-dom";

const ProjectDetail = props => {
  const projectId = props.match.params.id;

  const project = myProjects.find(el => {
    return el.id === projectId;
  });

  console.log(projectId, project);

  return (
    <div>
      <h2>{project.name}</h2>
      <h3>Used technologies: {project.technologies}</h3>
      <p>{project.description}</p>
      <Link to="/projects">Back to the projects</Link>
    </div>
  );
};

export default ProjectDetail;

```

And we have to add the new ProjectDetail.js component also to the routes in App.js

```js
// src/App.js
import ProjectDetail from "./ProjectDetail";
//
<Switch>
  <Route exact path="/" component={Home} />
  <Route exact path="/about" component={About} />
  <Route exact path="/projects" component={Projects} />
  <Route exact path="/projects/:id" component={ProjectDetail} />
  <Route component={NotFound} />
</Switch>
//
```

Finally let's just add a route that shows a div with a 404 message as a catch if no other route matches.

```js
// src/App.js
//
const NotFound = () => {
  return <div>404 not found</div>;
};
//
<Switch>
  <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/projects/:id" component={ProjectDetail} />
        <Route component={NotFound} />
      </Switch>
```