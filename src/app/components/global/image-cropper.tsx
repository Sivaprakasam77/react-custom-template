import * as Mui from "@mui/material";
import * as MuiLab from "@mui/lab";
import * as React from "react";
import ReactEasyCrop, { Area } from "react-easy-crop";
import * as Components from "src/app/components";

export function createImage(url: any) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });
}

export function getRadianAngle(degreeValue: any) {
  return (degreeValue * Math.PI) / 180;
}

export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export async function getCroppedImg(
  imageSrc: any,
  pixelCrop: any,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image: HTMLImageElement = (await createImage(
    imageSrc
  )) as unknown as HTMLImageElement;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return "";
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0);

  // As Base64 string
  return canvas.toDataURL("image/jpeg");
}

export function ImageCropper({
  imageSrc,
  save,
  cancel,
  width = 450,
  height = 290,
}: cropperProps) {
  const [loading, setLoading] = React.useState(false);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [rotation, setRotation] = React.useState<number>(0);
  const [zoom, setZoom] = React.useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(
    null
  );

  const onCropComplete = React.useCallback(
    (_: any, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = async () => {
    setLoading(true);
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      save(croppedImage);
      setLoading(false);
      cancel();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Components.Global.Dialog open={Boolean(imageSrc)} onClose={cancel}>
      <Mui.Stack
        component={Mui.DialogContent}
        spacing={2}
        sx={{
          position: "relative",
          width: { xs: "100%", sm: 450 },
          height: { xs: 200, sm: 400 },
          // background: "#333",
        }}
      >
        {Boolean(imageSrc) && (
          <ReactEasyCrop
            image={imageSrc}
            crop={crop}
            rotation={rotation}
            zoom={zoom / 2}
            aspect={1}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape="rect"
            cropSize={{ width, height }}
            objectFit="auto-cover"
            zoomWithScroll
          />
        )}
      </Mui.Stack>
      <Mui.DialogActions sx={{ justifyContent: "center" }}>
        <Mui.Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ width: "100%", p: 2, overflow: "visible" }}
        >
          <Mui.Stack sx={{ width: "100%" }}>
            <Mui.Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Mui.Typography variant="body1">Rotate</Mui.Typography>
              <Mui.Slider
                value={rotation}
                min={0}
                max={360}
                step={5}
                aria-labelledby="Rotation"
                marks={[
                  {
                    value: 0,
                    label: "0°",
                  },
                  {
                    value: 90,
                    label: "90°",
                  },
                  {
                    value: 180,
                    label: "180°",
                  },
                  {
                    value: 270,
                    label: "270°",
                  },
                  {
                    value: 360,
                    label: "360°",
                  },
                ]}
                onChange={(e, rotation: number | number[]) =>
                  setRotation(rotation as number)
                }
                sx={{ mx: 1, width: "90%" }}
              />
            </Mui.Stack>
            <Mui.Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Mui.Typography variant="body1">Zoom</Mui.Typography>
              <Mui.Slider
                value={zoom}
                min={1}
                max={5}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom: number | number[]) =>
                  setZoom(zoom as number)
                }
              />
            </Mui.Stack>
          </Mui.Stack>
          <Mui.Stack
            direction={{ xs: "row", sm: "column" }}
            spacing={2}
            justifyContent="center"
          >
            <Mui.Button size="small" variant="contained" onClick={cancel}>
              Cancel
            </Mui.Button>
            <MuiLab.LoadingButton
              loading={loading}
              size="small"
              variant="contained"
              onClick={showCroppedImage}
            >
              Save
            </MuiLab.LoadingButton>
          </Mui.Stack>
        </Mui.Stack>
      </Mui.DialogActions>
    </Components.Global.Dialog>
  );
}

interface cropperProps {
  imageSrc: string;
  save: (img: string) => void;
  cancel: () => void;
  width?: number;
  height?: number;
}
