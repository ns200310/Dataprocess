import { NavLink } from '@mantine/core';
import React, { useState } from 'react'
import { MdDashboard } from "react-icons/md";
import { Link, usePage } from '@inertiajs/react';

const data = [
    { icon: MdDashboard, label: 'Dashboard', description: 'Item with description', url: '/' },
    { icon: MdDashboard, label: 'Map', description: 'Item with description', url: '/map' },
];

const Navbar = () => {
    const { url } = usePage();
    const [active, setActive] = useState(0);

    const items = data.map((item, index) => (
        <NavLink
            component={Link}
            href={item.url}
            key={item.label}
            active={url === item.url}
            label={item.label}
            description={item.description}
            leftSection={<item.icon size={16} />}
            onClick={() => setActive(index)}
        />
    ));

    return items;

}

export default Navbar