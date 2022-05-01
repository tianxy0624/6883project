import { useState, useEffect, useRef } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
const toWei = (num) => ethers.utils.parseEther(num.toString())

export default function MyAccount({ contract, account }) {
  const [loading, setLoading] = useState(true)
  const [membership, setMembership] = useState(null)
  const loadMyAccount = async () => {
    const result = await contract.checkMembers()
    const membership = result
    setMembership(membership)
    setLoading(false)
  }
  const joinMembership = async () => {
    await (await contract.membership({value: toWei(1)})).wait()
    loadMyAccount()
  }

  useEffect(() => {
    !membership && loadMyAccount()
  })

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
      <div className="flex justify-center">
        {membership == false?
          <div className="px-5 py-3 container">
            <>
            <main style={{ padding: "1rem 0" }}>
            {[
                    'Secondary'
                ].map((variant) => (
                    <Card
                    bg={variant.toLowerCase()}
                    key={variant}
                    text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                    style={{ width: '40rem' }}
                    className="mb-2 "
                    >
                    <Card.Header>Membership</Card.Header>
                    <Card.Body>
                        <Card.Title>Do you wanna join us? </Card.Title>
                        <Card.Text>
                        Come and recieve our 10% discount ONLY FOR our members!
                        </Card.Text>
                        <Button onClick={() => joinMembership()} variant="primary">
                            Join for 1 ETH
                        </Button>
                    </Card.Body>
                    </Card>
                ))}
            </main>
            </>
          </div>
          : (
            <main style={{ padding: "1rem 0" }}>
              <h2>You are already our member!</h2>
              
            </main>
          )}
      </div>
    </div>
  );
}

