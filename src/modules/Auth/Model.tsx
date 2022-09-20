/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useState, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { FontLoader, GLTF, TextGeometry } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Plane014: THREE.Mesh
    Plane014_1: THREE.Mesh
    Plane014_2: THREE.Mesh
    badge001: THREE.Mesh
    badge002: THREE.Mesh
    badge003: THREE.Mesh
    badge004: THREE.Mesh
    badge005: THREE.Mesh
    nft: THREE.Mesh
    Plane001: THREE.Mesh
    QR: THREE.Mesh
    Text: THREE.Mesh
    Text001: THREE.Mesh
    Text002: THREE.Mesh
    Text004: THREE.Mesh
    Text005: THREE.Mesh
    Text007: THREE.Mesh
    Text008: THREE.Mesh
    Text009: THREE.Mesh
    Twitter_Logo: THREE.Mesh
    group_A: THREE.Mesh
    group_B: THREE.Mesh
    group_C: THREE.Mesh
    Text003: THREE.Mesh
    Text010: THREE.Mesh
    github_log: THREE.Mesh
    discord_logo: THREE.Mesh
  }
  materials: {
    charcoal: THREE.MeshStandardMaterial
    blue: THREE.MeshStandardMaterial
    ['emit blue']: THREE.MeshStandardMaterial
    ['badge.001']: THREE.MeshStandardMaterial
    ['badge.002']: THREE.MeshStandardMaterial
    ['badge.003']: THREE.MeshStandardMaterial
    ['badge.004']: THREE.MeshStandardMaterial
    ['badge.005']: THREE.MeshStandardMaterial
    image: THREE.MeshStandardMaterial
    logo: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
    green: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
    ['group A']: THREE.MeshStandardMaterial
    ['group B']: THREE.MeshStandardMaterial
    ['group C']: THREE.MeshStandardMaterial
    github: THREE.MeshStandardMaterial
    discord: THREE.MeshStandardMaterial
  }
}

type ActionName = 'All Animations'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export function Model(props) {
  const { domain, title, profileImage, daos, passportStyle, badges, links } = props;
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/model.glb') as GLTFResult
  // const { actions } = useAnimations<GLTFActions>(animations, group)
  
  const [QRMeterial, setQRMaterial] = useState<THREE.MeshStandardMaterial>();
  const [avatarMeterial, setAvatarMaterial] = useState<THREE.MeshStandardMaterial>();
  const [backgroundColor, setBackgroundColor] = useState();
  const [titleTextMeshes, setTitleTextMeshes] = useState<any[]>([]);
  const [domainTextMesh, setDomainTextMesh] = useState<any>();
  const [discordTextMesh, setDiscordTextMesh] = useState<any>();
  const [twitterTextMesh, setTwitterTextMesh] = useState<any>();
  const [githubTextMesh, setGithubTextMesh] = useState<any>();
  const [daoTextMeshes, setDaoTextMeshes] = useState([]);
  const [daoImageMaterials, setDaoImageMaterials] = useState<THREE.MeshStandardMaterial[]>([]);
  const [defaultBadgeImageMaterial, setDefaultBadgeImageMaterial] = useState<THREE.MeshStandardMaterial>();
  const [badgeImageMaterials, setBadgeImageMaterials] = useState<THREE.MeshStandardMaterial[]>([]);

  useEffect(() => {
    const QRMaterial = renderImageMaterial("/textures/qr.jpg");
    setQRMaterial(QRMaterial);
    const avatarMaterial = renderImageMaterial("/textures/img.jpg");
    setAvatarMaterial(avatarMaterial);
    const badgeImageMaterial = renderImageMaterial("/textures/badge 002.jpg");
    setDefaultBadgeImageMaterial(badgeImageMaterial);
  }, [])

  useEffect(() => {
    if (profileImage) {
      const avatarMaterial = renderImageMaterial(profileImage);
      setAvatarMaterial(avatarMaterial);
    }
  }, [profileImage]);

  useEffect(() => {
    setBackgroundColor(passportStyle.background)
  }, [passportStyle.background]);

  useEffect(() => {
    renderTextMesh(domain, (geometry, material, size) => {
      setDomainTextMesh({
        geometry,
        material,
        size
      })
    });
  }, [domain]);

  useEffect(() => {
    if (title && title.length > 100) {
      alert('Max charactor count is 100');
      return;
    }
    if (title) {
      const titleArr = title.match(/(.{1,25})/g);
      const len = titleArr.length;
      titleArr.map((title, index) => {
        let tempMeshes = [...titleTextMeshes];
        renderTextMesh(title, (geometry, material) => {
          tempMeshes[index] = { geometry: geometry, material: material };
          tempMeshes = tempMeshes.slice(0, len);
          setTitleTextMeshes(tempMeshes);
        });
      });
    } else {
      setTitleTextMeshes([]);
    }
  }, [title]);

  useEffect(() => {
    if (links.discord.username) {
      renderTextMesh(links.discord.username, (geometry, material) => {
        setDiscordTextMesh({
          geometry,
          material
        });
      });
    }
  }, [links.discord]);

  useEffect(() => {
    if (links.twitter.username) {
      renderTextMesh(links.twitter.username, (geometry, material) => {
        setTwitterTextMesh({
          geometry,
          material
        });
      });
    }
  }, [links.twitter]);

  useEffect(() => {
    if (links.github.username) {
      renderTextMesh(links.github.username, (geometry, material) => {
        setGithubTextMesh({
          geometry,
          material
        });
      });
    }
  }, [links.github]);

  useEffect(() => {
    daos.map((dao, index) => {
      renderTextMesh(dao.name, (geometry, material) => {
        let tempMeshes = daoTextMeshes;
        tempMeshes[index] = { geometry: geometry, material: material };
        tempMeshes = tempMeshes.slice(0, index+1);
        setDaoTextMeshes(tempMeshes);
      });
      const daoImageMaterial = renderImageMaterial(dao.profileImage.link);
      let tempMaterials = daoImageMaterials;
      tempMaterials[index] = daoImageMaterial;
      tempMaterials = tempMaterials.slice(0, index+1);
      setDaoImageMaterials(tempMaterials);
    });
  }, [daos]);

  useEffect(() => {
    let tempBadgeMaterials = [];
    badges.map((badge, index) => {
      const material = renderImageMaterial(badge.icon);
      tempBadgeMaterials[index] = material;
    });
    for (let i = 0; i < 5 - badges.length; i++) {
      tempBadgeMaterials.push(defaultBadgeImageMaterial);
    }
    setBadgeImageMaterials(tempBadgeMaterials);
  }, [badges]);

  const renderImageMaterial = (url) => {
    var loader =  new THREE.TextureLoader().load(url);
    loader.encoding = THREE.sRGBEncoding;
    const material = new THREE.MeshStandardMaterial({ transparent: true });
    material.map = loader;
    return material;
  }

  const renderTextMesh = (text, next) => {
    const loader = new FontLoader();
    loader.load('/fonts/optimer_regular.typeface.json', function (font) {
      let content = text === null ? "" : text;
      const geometry = new TextGeometry(content, {
        font: font,
        size: 0.8,
        height: 0.1,
        curveSegments: 0.1,
      });
      const material = new THREE.MeshStandardMaterial({ color: passportStyle.text });
      material.needsUpdate = true;
      const vector = new THREE.Vector3()
      const mesh = new THREE.Mesh(
        geometry,
        material
      )
      mesh.geometry.computeBoundingBox();
      const size = mesh.geometry.boundingBox.getSize(vector);
      next(geometry, material, size);
    });
  }

  return (
    <group ref={group} dispose={null}>
      <mesh geometry={nodes.Plane014.geometry} material={materials.charcoal} material-color={backgroundColor} />
      <mesh geometry={nodes.Plane014_1.geometry} material={materials.blue} material-color={passportStyle.line} />
      <mesh geometry={nodes.Plane014_2.geometry} material={materials['emit blue']} />
      
      {/* profile avatar image */}
      {profileImage && (<mesh geometry={nodes.nft.geometry} material={avatarMeterial} position={[3.2, -0.12, 0]} rotation={[0, Math.PI, Math.PI]} scale={[0.85, 0.85, -0.1]} />)}

      {/* logo image */}
      <mesh geometry={nodes.Plane001.geometry} material={materials['logo red yellow']} position={[-0.83, 1.77, 0.28]} rotation={[Math.PI / 2, 0, 0]} scale={0.58} material-color={passportStyle.logo} />

      {/* QR code image */}
      <mesh geometry={nodes.QR.geometry} material={QRMeterial} position={[-4.65, 0.03, 0.1]} />

      {/* domain text  default: -2.5 */}
      {domainTextMesh && (<mesh geometry={domainTextMesh.geometry} material={domainTextMesh.material} position={[-0.85-((domainTextMesh.size.x/7)), -0.1, 0.07]} rotation={[0, 0, 0]} scale={0.3} material-color={passportStyle.text} />)}

      {/* title texts */}
      {titleTextMeshes.map((mesh, index) => (
        <mesh geometry={mesh.geometry} material={mesh.material} position={[-2.15, -1.45-(0.2*index), 0.12]} rotation={[0, 0, 0]} scale={0.2} material-color={passportStyle.text} key={index} />
      ))}
      {/* <mesh geometry={nodes.Text003.geometry} material={nodes.Text003.material} position={[-2.16, -1.65, 0.12]} rotation={[Math.PI / 2, 0, 0]} scale={0.2} />
      <mesh geometry={nodes.Text010.geometry} material={nodes.Text010.material} position={[-2.16, -1.85, 0.12]} rotation={[Math.PI / 2, 0, 0]} scale={0.2} /> */}

      {/* badge images */}
      {badgeImageMaterials.map((material, index) => (
        <mesh geometry={nodes[`badge00${index+1}`].geometry} material={material} position={[-2.076+(0.6*index), -2.55, 0.12]} rotation={[-Math.PI / 2, 0, Math.PI]} scale={0.16} key={index} />
      ))}
      {/* {
        [0...(5-badges.length)].map((item, index) => (
          <mesh geometry={nodes[`badge00${index+1}`].geometry} material={defaultBadgeImageMaterial} position={[-2.076+(0.6*index), -2.55, 0.12]} rotation={[-Math.PI / 2, 0, Math.PI]} scale={0.16} />
      ))} */}

      {/* social links */}
      <mesh geometry={nodes.Twitter_Logo.geometry} material={materials['Material.001']} position={[-4.63, 2.1, 0.12]} rotation={[Math.PI / 2, 0, 0]} scale={2.42} />
      <mesh geometry={nodes.discord_logo.geometry} material={materials.discord} position={[-4.63, 1.66, 0.12]} />
      <mesh geometry={nodes.github_log.geometry} material={materials.github} position={[-4.63, 1.27, 0.12]} />

      {/* social texts */}
      {links.twitter.connected && twitterTextMesh && (
        <mesh geometry={twitterTextMesh.geometry} material={twitterTextMesh.material} position={[-4.42, 2.1, 0.12]} rotation={[0, 0, 0]} scale={0.16} material-color={passportStyle.text} />
      )}
      {links.discord.connected && discordTextMesh && (
        <mesh geometry={discordTextMesh.geometry} material={discordTextMesh.material} position={[-4.42, 1.65, 0.12]} rotation={[0, 0, 0]} scale={0.16} material-color={passportStyle.text} />
      )}
      {links.github.connected && githubTextMesh && (
        <mesh geometry={githubTextMesh.geometry} material={githubTextMesh.material} position={[-4.42, 1.26, 0.12]} rotation={[0, 0, 0]} scale={0.16} material-color={passportStyle.text} />
      )}

      {/* daos images */}
      {daos.length && daoImageMaterials.length ? daoImageMaterials.map((material, index) => (
        <mesh geometry={nodes.group_A.geometry} material={material} position={[-4.62, -1.33-(0.42*index), 0.12]} rotation={[Math.PI / 2, Math.PI, 0]} scale={[0.16, 0.09, 0.16]} key={index} />
      )) : null}

      {/* daos texts */}
      {daos.length && daoTextMeshes.length ? daoTextMeshes.map((mesh, index) => (
        <mesh geometry={mesh.geometry} material={mesh.material} position={[-4.38, -1.4-(0.42*index), 0.12]} rotation={[0, 0, 0]} scale={0.15} key={index} material-color={passportStyle.text} />
      )) : null}
    </group>
  )
}

useGLTF.preload('/model.glb')
