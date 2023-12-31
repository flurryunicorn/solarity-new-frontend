import React, { useState } from 'react'

import CommunityModule from 'modules/Community'
import Layout from 'components/Layout'

const Community = () => {
    const [sidebarToggler, setSidebarToggler] = useState(false)

    return (
        <Layout
            sidebarToggler={sidebarToggler}
            banner={<></>}
            onClick={() => setSidebarToggler(!sidebarToggler)}
        >
            <CommunityModule sidebarToggler={sidebarToggler} />
        </Layout>
    )
}

export default Community
