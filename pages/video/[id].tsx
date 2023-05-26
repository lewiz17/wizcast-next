import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";

type VIDEO = string;

type ItemVideoProps = {
  items: VIDEO[];
};

export const getServerSideProps: GetServerSideProps<ItemVideoProps> = async (
  context
) => {
  const { id } = context.params!;
  const res = await fetch(`https://api-m1.vercel.app/api/tt${id}`);
  const items = await res.json();

  return {
    props: {
      items,
    },
  };
};

function Video({
  items,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [options, setOptions] = useState([]);
  const [currentSource, setSource] = useState("");
  const [hasSource, setHasSource] = useState(false);

  useEffect(() => {
    setOptions(items);
  }, [options]);

  const handleOption = (pos) => {
    setHasSource(true);
    setSource(options[pos - 1]);
  };

  return (
    <div className="wrapper">
      {!hasSource && (
        <ul className="options">
          {Array.from({ length: options.length }).map((v, i) => {
            return i == 0 ? (
              <li onClick={() => handleOption(i + 1)}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDUlEQVR4nO1YMUscQRj9Iuz3aZB0AbGQC9inSJcqTULEXxCrraySOpBK/AsJeFsFUiT/wWa+yYlYWKSwFAUVCSm1MiE+8bjb827Xvdvd2b0smQev2/nmvZn3plgiDw8PD49/EYhoFW06wxadIqIVahpwK7xN6PGEmgY03kBEKz0TJ2jTa2oiYOUVVF42snwAPYDKPlR+ADRTmx44yi40WIMVdGmCN4XnbOXU48IA9imA5cPYgPIRDojrMRCVLx+MvIvFD/i20KyohB6obGKX5nKtMTQPyz8TBpR/YY8e5Zp1QAzlD7lEDw1Q/twtYmd2aeI1VjZSTr/PjYnn7MwtwvLurYbiBqyE8ekZeTH2++/zj6FykWHgEubhwvh9Z59D+by3JixuwEjrzuZ/oPw+83vlTxni+1H6mD1D1qFyNXjBpFXYQHeg5eNhEfwlrRew8mRo43sNyG8YWU7Nu+VoZK/jUuLjHiRFJHoBlW9jxQ/4NTXvNnFbxfOf6EHaq9LrBTrBU6j8ndiAyjU6wbOUvI8yLG9guAejQq66mbW8neP0+/HYTuR9lGXzf38P6iCXz39mD6qmOsj/2B5Uy9CdgaweVEXjKP/T6QG7y/9UeqAO8z+lHoTuDdTZA+M4//X2gN3nv9YeaAX5r7kHYXUG6uiBqSj/sYnBH4JKSFXDG2j7G/jPI+Th4eHhQXdwA668OoF3W4hAAAAAAElFTkSuQmCC" />{" "}
                VIP Opcion
              </li>
            ) : (
              <li onClick={() => handleOption(i + 1)}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFNElEQVR4nO2aS2xVVRSGb21ta2qU21qrA4iaMCAlUDWQMEEHBCHyEBW1qEkHYBsipamakhAeIakx6gAxJDoQnBAdKMEXRIwSSVQQqI9Eixad+BgoGkykFKl8ZtF/J9ubc889+5xTq4aV7OTk7LX+tffd67XXuYXCRfqfEtAI3AE8BbwFHAd+Bc5q2POg5oxnKVAs/BsIqAceBPYDfxJOo8DbwANA3URs4DLgEeBHb1EjwHvABp3MNPvFgUs1inpncxuBA5Jx9APQaz/OP7WJ24FvvAUcAVYCV6bAmgSsAo56eCeAheNtRs95Co8B83PEXwB84uFvz/10gGu0cKPTwBqgOlclY3qqgbXAsHfaLXmBX6/jRlFnei7A8TpnAF9J55CtIY+TcJv40EJsCoxLbKSQawIOeZtpyeITx7xNNKTEmWcjpWyDt5kjqXzGc+zBNCfh4eyykUG+yTOz7WlCrHPs1D6h3HFGo5jRZ4a1pgUhyc7liTVplQtrtRdOV2fE6vH8pbKJAY96eSJTiC1JdEczYtUAnwqrJ4mDu7IjU7IDZgrnFw2jmRkxFwrn+9jaTMXbhQiRRaGwnhHWsxpGWzNiVnmRdEUc4ztiWplRYS3ws7BuBG7S88msVS7QKax9cfeJUVWkwQVgCdZyKRvw3g3o3fKM2EXdb85FrhNYJkXvZlEkrH3Ceth7Z/WZ0d4c8N8X1uKoyac1uaGMbd4M3AosAe4HuoA+4HH5wIvAbpnnqHJHY8mJn9Gc8bwC7AS2Af3C6gTagUXALTLJqoj1bNZan4zaiF1BjZaU+RXuU4JMSi9FYLwcID8CdJRZi7Oe16Mmv9bktChh8cxS6HO0F1gPdJtS4C7VVsbXHCHfrLl54u2Q7HphOTIds2LW0Sq+41GTLtbH1lVajLPR34G7CxlJpvSbMD8Crq3Af5V4f4qatEhgVJtAcR3wgvjPA0+kLNWr5BuucbHLSqSE+o1GMm3Ek3kI+ENyb4aEbeBy4FXJWgDoC5CN3Ugi04qQm6+eldHnwA0JZCZ7GdpMalGgzuY406ro7DHAU707w84E/DvEazJTU+hrjXN2F36XhgJL/jXJdyTgtWhltCelrjvjwq9LiBtTdj9OSX5KQtNCMsFXBSokROsAGh1IATxbskMRd4g+jZoypjw77xKl6BWNkwKB1wn4ee9dm+fQ6LktoiewLlBXo1c0XlGOyRrKRqsCwa2JbXSvLmf9Xlj+VgO96xfPPXq3P1BXV8XiU8Vg0LVUMf20EuMydV1Qktuqlk6Dnl3iGxTvecnWBSTQAWG0xzHWqytudFtC8Lnewt1CvwDmRPDO0Vwp/9zA7s53FTev1j7aeXVABHGmsyVOiU5wi2d6RpsT6KkBPhN/dyV+dyquTbo2Af9BrxM4o6KCv/eqTMboYAL+Xi+J1oV2K4bjFifbt1zwWGl4TainRrKn4lqyjEVAu5SFd3f0fcL9Ak0xiS24xChT4kyOqausKWe0LQ14vXf0h9I2sbMQYxXyYa3hcOoOjH4N+zpr9HHUrW+8iLHE94F0n8j8wUcfeoY8M8vULUyos83TaaXMdXkBt3hmNqyGcrBzJ3T+Xs+xzZyuzltJvRcAUEM5l6+vytiW7FyeuODY4/rtXV9f3bG7YrAzzfcP+UGXV3Y4U8rta3GS0+kpaQ2dVXm9SXVUq7421WrY83RdijaJ1/UJXNnRPVH/gLByY4VapHYFCKVzupm2T8gGosg6KHbRsVsb8IYq3JPen2rs+Uu7nopncdn7xEUq/PfpLzAPdg9RxF6JAAAAAElFTkSuQmCC" />
                Opcion #{i}
              </li>
            );
          })}
        </ul>
      )}
      {hasSource && (
        <div className="iframe-wrapper">
          <button className="backBtn" onClick={() => setHasSource(false)}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEwklEQVR4nO2bS4xURRSGC1TQ+MARXBjHR9T4IAIJJiJoRBGXvl0JLAiGFhTBUeMwsICdJoQVighRMcRE4yNBNwY1AUQNDOAKfEdWshDjyGOEqB85cm5yUum+ffvequ57x/6Tm8x0nzr/qdO3Tp2qOuVcF110ERPA2cBtQB+wAfgc+AE4DPypz2H97DOVeQaYJm1dFQFcAMwBPgKOkR9Hga3AY6LTlR3AdcB64DjhIY58BbjWlQ3AFcDbwN8NjP8WeA2oAfdIJ4Ae4Bx9evQz+e4JYCPwXQNdwrEF6C1Dx8cAKxr84vuAZ8U5BfRfCTwH7G/wRgyIA8P2KiOAq4AvPaP+1XE/OwLfHcC7dd6yPTL0QvOlAngIGPIM2Q3c6iJDZxTptMUfwIOxuf+DjlH7KwwDTwGjXZsgXMAS5baxoRabeMDz/AFgUlTSdHumaIC1GIhFtsgj+goYH4WsNbtkBtnu2bY0NMmjwD+GQJKTc11JILaoTQnE1kdCJjdDRvn2MnXec8IOL4u8MYTSb7wxf7ErKXQ42Jiwv9CPBaz2ov0UV3IANwMnjN2rirz6w0bRIlcR6LRsf7jW1w/AB0bJ1+2c5wPlCZKYJXi/VQUTNa1NIuotrmKQrNTrw8RWGm823vvQVRTe1Lg5a6NxXhCZ7ioK3VWysaD5DAY8bhrtcRUHsNf0Z0GWBp/GSimBUcBaXcuvDqk7hVP2IhNsy5L4DKuwBJDLAnf+VWPMUCjdTXh7vWHQODEC7jLCByJ2XrAmlP4M/HZ7bWaaYL8RXB+x8/L/qBD6M9ogW+0J+tME3zCCtUCdf9nr/MZ2J1XAYsP/eprgLiN490jovNoy29jwRZrgISN4dZVfe8+ea4wdv6QJHjGClwTs/K8aX17I+cwr8ubIzpWx5bc0wZNGcExOMjnGioF5Bc8vEpyM7YA5kRwwtx0OOBJpCPwOvAS8mPOZ264hcOj/HgR3GcFZBUnFCes8J2zq0DR4r7FhZ7sToXWddkIriVC/fWUDkXd8OOjRfKZUeKYRPBjQgHpOWBtKfwb+7w3vna0shy8fActhqTFIIDtdY5s12GYa9AU2RpywRk9t8u3Xt84pBRYJPsnSYIFpsNdVHFqpkmB+lgYXeZuit7uKQospEsjQHpe14Zum4VZXUWi5TvPpzwdwkzkOl2A4zVVzS9wejNzQqoL3jPcGgbNctY7GxOYE7+TNn4eNkmWuIgCe9qa+fOsaYJVRdEqCiis5pGbJC+Iriygb600jPwITXEkhS3gv6xtsmvjkKJHZXcbCZeA8WekZO6UK/fpQyh/2iqQkWzzflbdISmoGHwhNUjMEyZtwaVCS/HVBtjhKsCQW2XKPSC45TI1Cls2eybJq9WxaHpu05pXK/iWnyB0olX2yTqnswnYZcL8WKONF3OltyvBs/Q9qy32xueuts+0eog2QwRdQMtSAtxqUy3fmFglnbnsMNLgXNKjFCb0Fz/b76pTHd/7CRB1Dt6RcmTmoR9QLZbdZUlON3qP16dHPZqnMhjrBrXxXZnzovZ9Yl6ZO6JZa+S5NNbg2J6c5Hxe8Nndcdcjh6IWuiuBMnJihe3ObtNr8Jz0uO6WP/P2zficyz2ubzo/vLrpwIxqnAULU637inaGpAAAAAElFTkSuQmCC"/></button>
          <iframe
            id="player"
            src={currentSource}
            allow="fullscreen"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Video;
