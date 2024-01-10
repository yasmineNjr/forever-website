import { useRef } from "react";
import Card from "../ui/Card";
import classes from './NewProductForm.module.css';
import DUMMY_DEPARTMENTS from "@/data/departments";

function NewProductForm(props){
    
    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const descriptionInputRef = useRef();
    const priceInputRef = useRef();
    const departmentInputRef = useRef();
    const groupsInputRef = useRef();
    const ingredientInputRef = useRef();
    /*
        title: 'Forever Aloe Vera Gel',
        image: 'https://static-01.daraz.pk/p/2feb410217f4f68c79e2aa91b04a6b16.jpg',
        description: 'Forever Aloe Vera Gel is a sugar-free drink made from the pure gel from the inner leaf of the aloe vera plant. And also important: no preservatives are added during the processing process, only vitamin C. In addition, the drink is gluten-free. This Aloe Vera Gel is therefore a healthy addition to a balanced diet.',
        price: '$10',
        department: {id: 'supplement', title: 'Dietary Supplement'},
        groups: [
                    {id: 'g1', title: 'Forever belly slimming group'},
                    {id: 'g2', title: 'The mini slimming group'},
                    {id: 'g3', title: 'Fit 1 group'},
                ],
        ingredients: [
                        {id: 'p1', product: 'Forever Aloe Vera Gel'}, 
                        {id: 'p7', product: 'Forever Garcinia Plus'},
                    ],
        date: '10-02-2022',//auto
        rate: '5',//not set yet
        salesCount: '100',//not set yet
     */

    function submitHandler(event) {
        event.preventDefault();
    
        const enteredTitle = titleInputRef.current.value;
        const enteredImage = imageInputRef.current.value;
        const enteredPrice = priceInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const entereDepartment = departmentInputRef.current.value;
        const enteredGroups = [];
        const enteredIngredient = [];
    
        const productData = {
          title: enteredTitle,
          image: enteredImage,
          price: enteredPrice,
          description: enteredDescription,
          department: entereDepartment,
          groups: enteredGroups,
          ingredients: enteredIngredient,
          date: new Date(),
          rate: '0',
          salesCount: '0',
        };
    
        props.onAddProduct(productData);
    }

    return  (
      <div className={classes.container}>
        <Card>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor='title'>Product Title</label>
              <input type='text' required id='title' ref={titleInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='image'>Product Image</label>
              <input type='url' required id='image' ref={imageInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='price'>Price</label>
              <input type='text' required id='price' ref={priceInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='department'>Department</label>
              <select id='department' ref={departmentInputRef} required>
                        <option value='0'></option>
                        {DUMMY_DEPARTMENTS && 
                            DUMMY_DEPARTMENTS.map(department => {
                                return <option value={department.id}>{department.title}</option>
                            })
                        }
              </select>
            </div>
            <div className={classes.control}>
              <label htmlFor='description'>Description</label>
              <textarea
                id='description'
                required
                rows='5'
                ref={descriptionInputRef}
              ></textarea>
            </div>
            <div className={classes.actions}>
              <button>Add Product</button>
            </div>
          </form>
        </Card>
      </div>
      );
}

export default NewProductForm;