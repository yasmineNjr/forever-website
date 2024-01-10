import ProductDetails from "@/components/products/ProductDetails";
import { useRouter } from "next/router";
import DUMMY_GROUPS from "@/data/groups";

function DetailsPage(props) {
    console.log(props);
    const router = useRouter();
    const groupId = router.query.groupId;
    
    const product = DUMMY_GROUPS.filter(prod => prod.id === groupId);
   
    return <ProductDetails  id={product[0].id}
                            image={product[0].image}
                            title={product[0].title}
                            price={product[0].price}
                            description={product[0].description}
                            ingredients={product[0].ingredients}
                            department={product[0].department.title}
                            groups={product[0].groups}
                            rate={product[0].rate}
            />
}
export async function getStaticProps(context){
    const groupId = context.params.groupId;
    console.log(groupId);
    return {
        props: {
            productData: {
                id: groupId,
                image: 'https://static-01.daraz.pk/p/2feb410217f4f68c79e2aa91b04a6b16.jpg',
                title: 'Forever Aloe Vera Gel',
                price: '10',
                description: 'Forever Aloe Vera Gel is a sugar-free drink made from the pure gel from the inner leaf of the aloe vera plant. And also important: no preservatives are added during the processing process, only vitamin C. In addition, the drink is gluten-free. This Aloe Vera Gel is therefore a healthy addition to a balanced diet.',
                ingredients: 'none',
                department: 'Dietary Supplement',
                groups: 'none',
                rate: '5',
            }
        }
    }
}
export async function getStaticPaths(){
    return {
        //fallback tells nextjs if path parameter contains all data(dynamic pages) or some of it(most visited as example)
        //false means it contains all data
        fallback: false,
        paths: [
            {
                params : {
                    groupId: 'g1'
                }
            },
            {
                params : {
                    groupId: 'g2'
                }
            }
        ]
    }
}
export default DetailsPage;