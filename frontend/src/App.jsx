import { useEffect, useState } from "react";

function App() {
  const [categories, setCategories] = useState([]);
useEffect(() => {

    fetch("http://localhost:3000/api/food-categories")
        .then(response => response.json())
        .then(data => {
            setCategories(data.data);
        })
        .catch(error => {
            console.log(error);
        });

}, []);
    return (
        <div>
            <h1>Food Category Master</h1>

            <button>Add Category</button>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
    {categories.map((category) => (
        <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>{category.status === 1 ? "Active" : "Inactive"}</td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>
    ))}
</tbody>
            </table>
        </div>
    );
}

export default App;