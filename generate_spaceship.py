import trimesh
import numpy as np
import os

# Suppress shapely warnings
import warnings
from shapely.errors import ShapelyDeprecationWarning
warnings.filterwarnings("ignore", category=ShapelyDeprecationWarning)


def create_hull():
    """Creates the hull of the spaceship."""
    # Main body
    hull_main = trimesh.primitives.Cylinder(radius=1.0, height=5.0, sections=32)

    # Nose cone
    nose_cone = trimesh.creation.cone(radius=1.0, height=2.0, sections=32)
    nose_cone.apply_translation([0, 0, 3.5])

    # Combine main body and nose cone
    hull = hull_main.to_mesh() + nose_cone

    # Smooth the mesh
    hull = hull.subdivide()

    # Set material
    hull.visual.face_colors = [150, 150, 150, 255] # Grey

    return hull

def create_wings():
    """Creates the wings of the spaceship."""
    # Create a single wing shape
    wing_polygon = trimesh.path.polygons.random_polygon(segments=5, radius=1.5)
    wing_shape = trimesh.primitives.Extrusion(
        polygon=wing_polygon,
        height=0.2
    )

    wing_mesh = wing_shape.to_mesh()
    wing_mesh.apply_scale([1, 0.5, 1])

    # Left wing
    wing_left = wing_mesh.copy()
    wing_left.apply_translation([2.0, 0, 0])
    wing_left.apply_transform(trimesh.transformations.rotation_matrix(np.pi / 2, [0, 1, 0]))

    # Right wing
    wing_right = wing_left.copy()
    wing_right.apply_scale([-1, 1, 1])
    wing_right.apply_translation([-4.0, 0, 0])

    # Set material
    wing_left.visual.face_colors = [100, 100, 120, 255] # Darker grey
    wing_right.visual.face_colors = [100, 100, 120, 255]

    return wing_left, wing_right

def create_cockpit():
    """Creates the cockpit of the spaceship."""
    cockpit = trimesh.creation.icosphere(subdivisions=2, radius=0.8)
    cockpit.apply_scale([1, 0.6, 0.5])
    cockpit.apply_translation([0, 0.5, 2.0])

    # Set material (glassy)
    cockpit.visual.face_colors = [173, 216, 230, 150] # Light blue with alpha

    return cockpit

def create_booster():
    """Creates the booster of the spaceship."""
    booster = trimesh.primitives.Cylinder(radius=0.8, height=1.5, sections=24)
    booster.apply_translation([0, 0, -3.0])

    # Glowing part
    glow = trimesh.primitives.Cylinder(radius=0.6, height=0.2, sections=24)
    glow.apply_translation([0, 0, -3.7])

    # Set material
    booster_mesh = booster.to_mesh()
    glow_mesh = glow.to_mesh()
    booster_mesh.visual.face_colors = [80, 80, 80, 255] # Dark grey
    glow_mesh.visual.face_colors = [255, 100, 0, 255] # Orange glow

    booster_assembly = booster_mesh + glow_mesh

    return booster_assembly

def create_bolt():
    """Creates a single bolt."""
    bolt = trimesh.primitives.Cylinder(radius=0.05, height=0.1, sections=8)
    head = trimesh.primitives.Cylinder(radius=0.08, height=0.05, sections=8)
    head.apply_translation([0, 0, 0.05])

    single_bolt = bolt.to_mesh() + head.to_mesh()
    single_bolt.visual.face_colors = [200, 200, 200, 255] # Light grey

    return single_bolt

if __name__ == '__main__':
    # Create directory for models
    output_dir = "assets/models"
    os.makedirs(output_dir, exist_ok=True)

    # Generate parts
    hull = create_hull()
    wing_left, wing_right = create_wings()
    cockpit = create_cockpit()
    booster = create_booster()
    bolt = create_bolt()

    # Export parts
    hull.export(os.path.join(output_dir, "hull.glb"))
    wing_left.export(os.path.join(output_dir, "wing_left.glb"))
    wing_right.export(os.path.join(output_dir, "wing_right.glb"))
    cockpit.export(os.path.join(output_dir, "cockpit.glb"))
    booster.export(os.path.join(output_dir, "booster.glb"))
    bolt.export(os.path.join(output_dir, "bolt.glb"))

    print(f"Spaceship parts generated and exported to {output_dir}")
