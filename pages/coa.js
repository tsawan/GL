import { useState } from "react";

const coa = () => {
  const [count, setCount] = useState(5);

  return <div>Chart of Accounts<br/>
    <hr/>
      count value {count} <br/>
      <button onClick={() => setCount(count+1)}>Increment</button>
  </div>;
};
export default coa;
