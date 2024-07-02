
## React : Library + SPA

## Topics:

0. pass data to child - how to modify this original data from child 
   so it can change for all ?
1. Event Handling
2. Component Lifecycle
3. Hooks - custom hooks
4. Router
5. State Management : context API 
6. Redux
7. Forms - Controller component
8. Forms - Uncontrolled Components
9. API - fetching data
10. Lazy Loading
11. testing


## DOM : 


## create Project :

1. use VITE
2. cmd : npm create vite@version
3. select React with js
4. continue 

## File extensions
 - .jsx : js xml

## Props in React
- Properties : to pass data
- Ex. data from API to component

## CSS Modules : component.module.css
- convention to write css file name to bind it with specific component 
- .module is because it's convention
- Ex. component: food.jsx --> css file should be: food.module.css
- this generates automatic class name

## ---------------------------

## Passing child HTML : CHILD Props- Container

- props.children: in built
- Use case: if want to apply same CSS to different or multiple 
  component use this approach.
  - on flipkart there are items with same size and css can use same
   component
  - on youtube same thing for vdos

Ex. 
function Container (props) {
    return (
        <div class=parent>
        {props.children}
        </div>
    )
}

- HTML passing to Container:

<Container>
<p>this is passed as child </p>
<p>to Container components</p>
</Container>

## props:
- used to send data from parent to child
- childs can not share data with each other
- so if need to modify something need to do it
  from parent.
- if something is changed in props it re-renders
  all child components

## Lifting/Pulling State UP
- if need to share data between component
  then give to their common parent and modify

## ---------------------------

## Events

React app <--> Virtual DOM <--> DOM

- avoid inline arow function - performance issue
- syntheticBaseEvent : react Event
- ex: onClick, onChange
Ex. onClick :

<button onClick={iteam}>{iteam}</button>

- why? if need to modify something which is common in
  multiple components then need pass method defination 
  from parent so it it changes the common data it
  will change for other childs as well.

## -------------------------

## States:
- in react every component is loaded only once 
  it means original data can not be modified
- if want to re-render component need to use sates in 
  functional components
- States are used to change data 
- local and private only within component
### useState : Hook
- this returns arr of 1) current_value_of_state 2) Method

EX. 
1. component Search must change values passed to ListIems
2. but react func components are loaded once
3. useState do 2 things -> 1. creates copy of lst
    -> 2. gives method to change values of copy 
       dynamically
4. take copy ==> give to ListItems
5. now when ever this copy is updated using useState method
   it will also update where ever it is used and scope is component only
   not global 
6. type in search - give typed value to parent using handler 
   given in parent which then be used to modify copy 

function App() {
  let lst = [ "ab", "abc", "bcd", "cde", "x" ];
  const [filteredData, setFilteredData] = useState(lst);
  const handleSearch = (event) => {
    console.log(event.target.value);
    lst=lst.filter((item) => item.includes(event.target.value));
    setFilteredData(lst);
  }

  return (<div>
  <Search handleChange={handleSearch}/>
  <ListItems items={filteredData}/>
  </div>)
}

## ----------------------------------



