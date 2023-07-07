import Image from "next/image";
import Link from "next/link";

type URL = {
  url: string;
};

const Sharer: React.FC<URL> = ({ url }: URL) => {
  return (
    <div className="share flex xs:flex-wrap xs:w-full mt-5">
      <Link
        href={`https://twitter.com/intent/tweet?text=Wizpelis - Mejores peliculas&url=${url}`}
        target="blank_"
        className="xs:w-full"
      >
        <div className="sh-option rounded bg-blue text-white shadow px-2 py-2 hover:opacity-90">
          <Image
            src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABeUlEQVR4nO3WvUtXURjA8auWCBKZ4OYsKs3RUlIIgkaL/kAMGtqCgv6CSFtcRIK2phSHaFAkl4IWHcVFN116GSWIhqS3T1w4w0U994XfdZHfd7yc5/lynnOe89wkadGiBOjCFOYwi8n02ynrOmMJhtFTRpaJuYUvTvIJI+jFPbzHpViSJWxGF5xcfx0/xfmFP/iHGbTFEu2FgG30lxDvKCaVrmIBj2OJ9jMBh5jOkQ6pxlt0xJKtnRKQln78eJlwt4L0FdrzSpeX7DNeoBF2O1FB3Cg6s4tYVj8jReJdvA7nWycDReJ36udH9OHIiMfOQLyeK83In9csflhKHOT38bUG6beyr2CS9lvouw84alL8rPRuU/Ckht2mFbuSVAFteNmE9C9uV5JmwWh6KyNjL4/ZpFkwiK0K0sXo+CsC3aGn3+B3SeFRdOzlgRvYwEEY4FX4iKu5gjxwGY/Cj0AR37GCm0mdoA93Qmulr9k8nuIBruFCrcIW547/OjHT9ha3CWoAAAAASUVORK5CYII=`}
            width={24}
            height={24}
            alt=""
          />
          Compartir en twitter
        </div>
      </Link>
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="blank_"
        className="xs:w-full"
      >
        <div className="sh-option rounded bg-blue2 text-white shadow px-2 py-2 hover:opacity-90">
          <Image
            src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABdUlEQVR4nO2Wu0oDQRhG06hgZ6PivY6FhdjpA1h4Q6zVIpUm+jpG1F6081ZaWGofA75AvIBZ0RATjwyMMFl2//x7EVLkg2mWOXN27pPJdNNpASaAPHADlIAPW0r22y4wnqZwFDgAGrRPEzgFppJKVwGP6KkCy3Gle7YHcWPYQpyeNiNI3oGvELmu58CYcngrwDYw4LB9wF3AsI9oxEcK6ScwHcLfBtQ/1GwZzeot+rgeYAaYBR4C6jfMSEpis0812XCYfqCsYHYk8bVSPO8wi0rmUhI/KhuZc5hNJVOSxF4M8ZaS8SSxOXvDshAKtrYRNt9VCXpKIgZ6ge8QviyBVwnFWYG/kMB9ATTX370tWYdZcr5LizMviSeBOukvrnrbuxo4+Qdxsd00/R2bbymKX8Xj0idfB35SEJs2VlRSp8GccCdrxIbNRZL6ev4SQ/wMrGWSBBgGjoGaQlyz9/lQImnADxSAc/cRYJ9JZ/aNNtgCddMJ+QUhA1R3vgYpAAAAAABJRU5ErkJggg==`}
            width={24}
            height={24}
            alt=""
          />
          Compartir en facebook
        </div>
      </Link>
      <Link
        href={`https://api.whatsapp.com/send?text=Wizpelis - Peliculas y series%20${url}`}
        target="blank_"
        className="xs:w-full"
      >
        <div className="sh-option rounded bg-green2 text-white shadow px-2 py-2 hover:opacity-90">
          <Image
            src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACrElEQVR4nO2ZzYuNURzH7x26yMIMEtOUWUwJC1EmWcmKsvOShb8AScgMy4k0C5vxmpUkFhPKzMJbISsLeV1R5KXQXCOhe0f46JffYnrc555znuec57nq+dTd3Pv8Xr7nOef8fufcUqmgoCA1QBuwCjgIXAKeAePAD/2M63fy2wF9tq0VEu8CjgDvcOet2nblkfgc4BQwQXrqwEnxmVXyW4Eq/hkDtoRMfKqOemhOSCzfyc8ARsiOqxLTV/JTgMtkz6iXN5HRtInjuI8FmzebkyY/W3eGvKkCc0NMHamw24FZEgA4E1DEsSQV1lSkdkZs5mlRCkEd6HQRICW+GdLXlBvYnScch122TVNv0x9juzqggNdWDaB2iiY2NrF/GFBEr40AaYlNrGtiL61AKPpsBEjPbmJXjG0n8DmggGEbAbJATdxuYDcduE9YntgI+GTh6DewJGK3gvCM2QiwPaSMNrA9G1hA3UZAzcHhtohtO/A8bwEfHBzKgu2O2C9y9OF9Cj11cvl3358Z8bEYeNFE9F7gJoEW8cUEjoejrYVOp6ivn8D6Sc/0AleAX7ZxbAT0k4zTMf3RGuCWPrMvJuZS4IavQrac5JwDpsX4bTfE3WDhf6WNgDLwJoWIe8BCY6B/4+7x0sypswHS8UUPOxXLeGXgrpd2Wh3O93Q4kVHbLYcdQ/t+1OCn5nSgUccv8YfsPtf0rSwDOoAFchMHPLCwH3JNvofWoep8bwrsoHXY5JS8CsjyGtHf1NHkK8BX8mck0dUisDbvzElzuQsM5pz8UKpLXeBRTol/TLRgUxxoXnkqdjUd9Y7UyauAOzGBvunCki22Z1LFHtCK64rYHHKusBYCuoHrwHedToO6sCsWXex+4IIcPID3OroTelHwWM8NfdJVtsTfrAUFpf+fP1Ewav8MY9gWAAAAAElFTkSuQmCC`}
            width={24}
            height={24}
            alt=""
          />
          Compartir en whatsapp
        </div>
      </Link>
    </div>
  );
};

export default Sharer;
