import Head from 'next/head'
import { Button } from 'antd'

const Home = () => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
    Row type="flex" justify="center" align="center">
    <Col span={4} >
      <form onSubmit={handleSubmit(this.handleSubmit)} >
        <Field
          style={{ marginBottom: 12 }}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          name="name"
          type="text"
          component={AInput}
        />
        <Field
          style={{ marginBottom: 12 }}
          className="form-group"
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          name="password"
          type="password"
          component={AInput}
          />

          <Button

            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
      </form>
    </Col>
  </Row>
  </div>
)

export default Home




