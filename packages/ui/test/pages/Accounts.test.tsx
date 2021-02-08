import React from 'react'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { cleanup, render } from '@testing-library/react'
import BN from 'bn.js'
import { expect } from 'chai'
import sinon from 'sinon'
import { aliceSigner } from '../mocks/keyring'
import { KeyringContext } from '../../src/providers/keyring/context'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import * as useBalanceModule from '../../src/hooks/useBalance'
import { Accounts } from '../../src/pages/Profile/Accounts'
import { Account } from '../../src/hooks/types'

describe('UI: Accounts list', () => {
  let accounts: {
    hasAccounts: boolean
    allAccounts: Account[]
  }
  let alice: string

  before(cryptoWaitReady)

  beforeEach(() => {
    alice = aliceSigner().address
    accounts = {
      hasAccounts: false,
      allAccounts: [],
    }
    sinon.stub(useAccountsModule, 'useAccounts').returns(accounts)
  })

  afterEach(cleanup)

  context('with empty keyring', () => {
    after(() => {
      sinon.restore()
    })

    it('Shows loading screen', async () => {
      const profile = render(
        <KeyringContext.Provider value={new Keyring()}>
          <Accounts />
        </KeyringContext.Provider>
      )
      expect(profile.getByText('Loading accounts...')).to.exist
    })
  })

  context('with development accounts', () => {
    beforeEach(() => {
      accounts.hasAccounts = true
      accounts.allAccounts.push({
        address: alice,
        name: 'alice',
      })
    })

    afterEach(() => {
      sinon.restore()
    })

    it('Renders empty balance when not returned', async () => {
      const { findByText } = renderAccounts()
      sinon.stub(useBalanceModule, 'useBalance').returns(null)

      const alice = aliceSigner().address
      const aliceBox = (await findByText(alice))?.parentNode?.parentNode
      expect(aliceBox).to.exist
      expect(aliceBox?.querySelector('h5')?.textContent).to.equal('alice')
      expect(aliceBox?.nextSibling?.textContent).to.equal('-')
    })

    it('Renders balance value', async () => {
      sinon.stub(useBalanceModule, 'useBalance').returns({
        total: new BN(1000),
        locked: new BN(0),
        transferable: new BN(1000),
        recoverable: new BN(0),
      })

      const { findByText } = renderAccounts()

      const aliceBox = (await findByText(alice))?.parentNode?.parentNode
      expect(aliceBox?.querySelector('h5')?.textContent).to.equal('alice')
      expect(aliceBox?.nextSibling?.textContent).to.equal('1,000')
    })

    function renderAccounts() {
      return render(<Accounts />)
    }
  })
})
