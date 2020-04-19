import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';

const addAccountMutation = gql`{
    mutation addGlCode(ep:[glcodes_insert_input]) {
    insert_glcodes(objects: ep) {
        returning {
        glcode
        glhead
        }
    }
    }
}`;

const AddAccount = () => {
  const [addNewAccount, { data }] = useMutation(addAccountMutation);
  let code, title;

  // need to change the form to use formik
  return (
    <div>
     <h2>Add account under 010102</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          addNewAccount({ variables: { ep: {
              glcode: code.value,
              glhead: title.value,
              subgrpglcode: "010102",
              enteredby: "tsawan",
              enteredon: "2020-04-18"
            } } });
          code.value = '';
          title.value = '';
        }}
      >
        <label>GL Code</label>
        <input
          ref={node => {
            code = node;
          }}
        />
        <br/>
        <label>GL Head (Title)</label>
        <input
          ref={node => {
            title = node;
          }}
        />
        <br/>

        <button type="submit">Add New Account Now</button>
      </form>
    </div>
  );
};

export default AddAccount;
