import React, { FC, ReactElement } from 'react';
import IconWrapper, { IconWrapperInterface } from './iconWrapper';

export const KuCoinIcon: FC<IconWrapperInterface> = ({
  width = '32',
  height = '32',
  ...props
}): ReactElement => (
  <IconWrapper {...props} width={width} height={height} viewBoxSize="32">
    <rect width="32" height="32" rx="10" fill="white" fill-opacity="0.15" />
    <rect
      x="0.5"
      y="0.5"
      width="31"
      height="31"
      rx="9.5"
      stroke="url(#paint0_radial_24_873)"
      stroke-opacity="0.2"
    />
    <path
      d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z"
      fill="#41E6AF"
    />
    <path
      d="M22.9903 14.9718L22.5937 14.2687L20.4225 10.4068H20.4125L20.3431 10.2704H19.55L16.4666 16.0108L19.5996 21.7196H20.3927L20.4125 21.6882L23.0002 16.9972H21.404L20.0259 19.5893L18.0628 16.0003L19.9862 12.4112L21.3842 14.9613L22.9903 14.9718Z"
      fill="white"
    />
    <path
      d="M10.9234 14.0373L12.3709 11.4242L11.8851 10.5951L11.548 10.0075L9.0694 14.6354L9 14.7614L9.39658 15.496H15.6328L18.7758 9.79757L18.3395 9L13.9771 9.01049H13.9077L13.2137 9L13.5805 9.7346L13.9474 10.4692L16.8028 10.4587L14.8397 14.0373H10.9234Z"
      fill="white"
    />
    <path
      d="M14.0068 11.0153C13.8978 11.0153 13.7788 11.0362 13.6598 11.0782C13.531 11.1202 13.4021 11.1832 13.2831 11.2566C12.946 11.477 12.708 11.7918 12.6684 12.0857C12.6486 12.2221 12.6783 12.3375 12.7477 12.4215C12.7576 12.4425 12.7774 12.453 12.7874 12.474C12.7973 12.4845 12.8072 12.4845 12.8171 12.495C12.827 12.5054 12.827 12.5054 12.8369 12.5159C12.8568 12.5264 12.8667 12.5369 12.8865 12.5474C13.0947 12.6524 13.4219 12.6314 13.7392 12.474L13.7491 12.4635C13.7788 12.453 13.8086 12.432 13.8383 12.4215C13.868 12.411 13.8879 12.39 13.9176 12.369C13.9474 12.348 13.9771 12.327 14.0068 12.3061C14.0366 12.2851 14.0564 12.2641 14.0862 12.2431L14.106 12.2326C14.1258 12.2116 14.1457 12.2011 14.1655 12.1801C14.1754 12.1696 14.1754 12.1696 14.1853 12.1591C14.2051 12.1486 14.2151 12.1277 14.225 12.1172C14.2349 12.1067 14.2448 12.0962 14.2547 12.0752C14.2646 12.0542 14.2845 12.0437 14.2944 12.0227C14.3043 12.0122 14.3043 12.0122 14.3142 12.0017C14.3241 11.9807 14.3439 11.9702 14.3539 11.9492L14.3737 11.9283C14.3836 11.9073 14.3935 11.8968 14.4034 11.8758C14.4034 11.8758 14.4034 11.8758 14.4034 11.8653L14.4133 11.8443C14.4332 11.8233 14.4431 11.7918 14.453 11.7708C14.4629 11.7499 14.4728 11.7184 14.4827 11.6974L14.4927 11.6869C14.4927 11.6764 14.5026 11.6659 14.5026 11.6659C14.5026 11.6554 14.5026 11.6554 14.5125 11.6449C14.5125 11.6239 14.5224 11.6134 14.5224 11.5924C14.5224 11.5715 14.5323 11.5715 14.5323 11.561C14.5323 11.5505 14.5323 11.54 14.5323 11.54C14.5323 11.519 14.5323 11.5085 14.5323 11.498V11.477C14.5323 11.456 14.5323 11.4455 14.5323 11.4245C14.5323 11.414 14.5323 11.414 14.5323 11.4035C14.5323 11.3931 14.5323 11.3826 14.5323 11.3826C14.5323 11.3721 14.5323 11.3721 14.5323 11.3616V11.3511C14.5323 11.3301 14.5224 11.3196 14.5125 11.2986C14.5026 11.2776 14.4927 11.2671 14.4827 11.2461C14.4133 11.0887 14.225 11.0153 14.0068 11.0153Z"
      fill="white"
    />
    <path
      d="M14.7313 11.7812C14.7313 11.8022 14.7214 11.8127 14.7115 11.8337C14.7115 11.8442 14.7115 11.8442 14.7016 11.8547C14.6917 11.8862 14.6818 11.9071 14.6619 11.9386C14.5529 12.159 14.3744 12.3689 14.1563 12.5368C14.1266 12.5578 14.0968 12.5788 14.0671 12.5998C14.0373 12.6208 14.0076 12.6417 13.9778 12.6522H13.9679C13.958 12.6627 13.9481 12.6627 13.9382 12.6732C13.9183 12.6837 13.9084 12.6942 13.8886 12.7047H13.8787C13.8688 12.7047 13.8589 12.7152 13.8489 12.7152C13.8291 12.7257 13.8093 12.7362 13.7895 12.7362L13.7696 12.7467C13.7696 12.7467 13.7696 12.7467 13.7597 12.7467C13.7498 12.7467 13.7399 12.7572 13.73 12.7572C13.7101 12.7677 13.6903 12.7677 13.6705 12.7782L13.6507 12.7887H13.6407C13.6209 12.7992 13.6011 12.7992 13.5813 12.8096C13.5713 12.8096 13.5614 12.8201 13.5416 12.8201H13.5317C13.5119 12.8201 13.492 12.8306 13.4821 12.8306C13.4722 12.8306 13.4524 12.8306 13.4425 12.8411H13.4325C13.4226 12.8411 13.4127 12.8411 13.4028 12.8516C13.3929 12.8516 13.383 12.8516 13.373 12.8516C13.3433 12.8516 13.3036 12.8621 13.2739 12.8621H13.264C13.2342 12.8621 13.2045 12.8621 13.1748 12.8621C13.1648 12.8621 13.1549 12.8621 13.1549 12.8621H13.145C13.1252 12.8621 13.1054 12.8621 13.0855 12.8516C13.0756 12.8516 13.0657 12.8516 13.0558 12.8411C13.036 12.8411 13.0161 12.8306 12.9963 12.8306C12.9864 12.8306 12.9765 12.8201 12.9666 12.8201L13.5119 13.7541L14.6818 13.7436L15.2866 12.6103L14.7413 11.6658C14.7413 11.6763 14.7413 11.6868 14.7313 11.6973C14.7313 11.7077 14.7313 11.7077 14.7313 11.7182C14.7313 11.7287 14.7214 11.7392 14.7214 11.7602C14.7313 11.7707 14.7313 11.7812 14.7313 11.7812Z"
      fill="white"
    />
    <path
      d="M20.9474 15.1924C21.0069 15.2868 21.0466 15.4023 21.0763 15.5387C21.1061 15.6751 21.1259 15.822 21.1259 15.969C21.1259 16.3887 20.997 16.7665 20.7789 16.9554C20.6797 17.0394 20.5707 17.0814 20.4616 17.0604C20.4418 17.0604 20.422 17.0499 20.4021 17.0499C20.3922 17.0499 20.3823 17.0394 20.3724 17.0394C20.3625 17.0394 20.3526 17.0289 20.3426 17.0289C20.3228 17.0184 20.303 17.0079 20.2931 16.9974C20.0948 16.861 19.9461 16.5566 19.9064 16.1893V16.1789C19.9064 16.1474 19.8965 16.1159 19.8965 16.0739C19.8965 16.0424 19.8965 16.0109 19.8965 15.9795C19.8965 15.9375 19.8965 15.906 19.8965 15.864C19.8965 15.8325 19.8965 15.8011 19.9064 15.7696V15.7486C19.9064 15.7276 19.9163 15.6961 19.9163 15.6751C19.9163 15.6646 19.9163 15.6541 19.9163 15.6436C19.9163 15.6227 19.9262 15.6017 19.9262 15.5807C19.9262 15.5597 19.9361 15.5492 19.9361 15.5282C19.9461 15.5072 19.9461 15.4862 19.956 15.4652C19.956 15.4547 19.9659 15.4443 19.9659 15.4338C19.9758 15.4128 19.9758 15.3918 19.9857 15.3708L19.9956 15.3393C20.0055 15.3183 20.0155 15.3078 20.0155 15.2868C20.0155 15.2868 20.0155 15.2868 20.0155 15.2763L20.0254 15.2554C20.0353 15.2239 20.0551 15.2029 20.065 15.1819C20.0749 15.1609 20.0948 15.1399 20.1047 15.1189L20.1146 15.1084C20.1245 15.0979 20.1245 15.0979 20.1344 15.0874C20.1443 15.077 20.1443 15.077 20.1443 15.0665C20.1543 15.056 20.1642 15.0455 20.1741 15.035C20.184 15.0245 20.1939 15.014 20.1939 15.014C20.2038 15.0035 20.2038 15.0035 20.2137 14.993C20.2237 14.9825 20.2336 14.972 20.2435 14.9615L20.2633 14.951C20.2732 14.9405 20.2931 14.93 20.303 14.9195C20.3129 14.9195 20.3129 14.9195 20.3228 14.909C20.3327 14.909 20.3426 14.8986 20.3426 14.8986C20.3426 14.8986 20.3526 14.8986 20.3526 14.8881H20.3625C20.3823 14.8881 20.3922 14.8776 20.412 14.8776C20.4319 14.8776 20.4517 14.8776 20.4715 14.8776C20.6797 14.8671 20.8285 14.993 20.9474 15.1924Z"
      fill="white"
    />
    <path
      d="M19.9471 14.9406C19.9372 14.9511 19.9273 14.9721 19.9174 14.9826C19.9174 14.9931 19.9075 14.9931 19.9075 15.0036C19.8876 15.0246 19.8777 15.0561 19.8579 15.0771C19.729 15.287 19.6596 15.5598 19.6398 15.8432C19.6398 15.8851 19.6398 15.9166 19.6398 15.9586C19.6398 15.9901 19.6398 16.0321 19.6398 16.0635V16.074C19.6398 16.0845 19.6398 16.1055 19.6398 16.116C19.6398 16.137 19.6398 16.158 19.6497 16.179V16.1895C19.6497 16.2 19.6497 16.2105 19.6497 16.2209C19.6497 16.2419 19.6596 16.2629 19.6596 16.2839V16.3049C19.6596 16.3049 19.6596 16.3049 19.6596 16.3154C19.6596 16.3259 19.6596 16.3364 19.6695 16.3469C19.6695 16.3679 19.6794 16.3889 19.6794 16.4098L19.6893 16.4308V16.4413C19.6893 16.4623 19.6993 16.4833 19.7092 16.5043C19.7092 16.5148 19.7191 16.5253 19.7191 16.5358V16.5463C19.729 16.5673 19.729 16.5778 19.7389 16.5987C19.7389 16.6092 19.7488 16.6197 19.7587 16.6407V16.6512C19.7587 16.6617 19.7687 16.6722 19.7687 16.6827C19.7786 16.6932 19.7786 16.7037 19.7786 16.7037C19.7885 16.7352 19.8083 16.7667 19.8281 16.7981L19.8381 16.8086C19.8579 16.8401 19.8678 16.8611 19.8876 16.8821C19.8876 16.8926 19.8975 16.8926 19.8975 16.9031L19.9075 16.9136C19.9174 16.9346 19.9372 16.9451 19.9471 16.966C19.957 16.9765 19.957 16.987 19.9669 16.987C19.9868 17.008 19.9967 17.0185 20.0066 17.0395C20.0165 17.05 20.0264 17.05 20.0264 17.0605H18.9854L18.3806 16.0006L18.9755 14.8672H20.0165C20.0066 14.8777 20.0066 14.8777 19.9967 14.8882L19.9868 14.8987C19.9769 14.9092 19.9669 14.9197 19.9471 14.9406C19.957 14.9406 19.9471 14.9406 19.9471 14.9406Z"
      fill="white"
    />
    <path
      d="M14.0068 20.9748C13.8978 20.9748 13.7788 20.9538 13.6598 20.9119C13.531 20.8699 13.4021 20.8069 13.2831 20.7335C12.946 20.5131 12.708 20.1982 12.6684 19.9044C12.6486 19.768 12.6783 19.6525 12.7477 19.5686C12.7576 19.5476 12.7774 19.5371 12.7874 19.5161C12.7973 19.5056 12.8072 19.5056 12.8171 19.4951C12.827 19.4846 12.827 19.4846 12.8369 19.4741C12.8568 19.4636 12.8667 19.4532 12.8865 19.4427C13.0947 19.3377 13.4219 19.3587 13.7392 19.5161L13.7491 19.5266C13.7788 19.5371 13.8086 19.5581 13.8383 19.5686C13.868 19.5791 13.8879 19.6001 13.9176 19.6211C13.9474 19.642 13.9771 19.663 14.0068 19.684C14.0366 19.705 14.0564 19.726 14.0862 19.747L14.106 19.7575C14.1258 19.7785 14.1457 19.789 14.1655 19.81C14.1754 19.8205 14.1754 19.8205 14.1853 19.8309C14.2051 19.8414 14.2151 19.8624 14.225 19.8729C14.2349 19.8834 14.2448 19.8939 14.2547 19.9149C14.2646 19.9359 14.2845 19.9464 14.2944 19.9674C14.3043 19.9779 14.3043 19.9779 14.3142 19.9884C14.3241 20.0093 14.3439 20.0198 14.3539 20.0408L14.3737 20.0618C14.3836 20.0828 14.3935 20.0933 14.4034 20.1143V20.1248L14.4133 20.1458C14.4332 20.1668 14.4431 20.1982 14.453 20.2192C14.4629 20.2402 14.4728 20.2717 14.4827 20.2927L14.4927 20.3032C14.4927 20.3137 14.5026 20.3242 14.5026 20.3242C14.5026 20.3347 14.5026 20.3347 14.5125 20.3452C14.5125 20.3662 14.5224 20.3766 14.5224 20.3976C14.5224 20.4186 14.5323 20.4186 14.5323 20.4291C14.5323 20.4396 14.5323 20.4501 14.5323 20.4501C14.5323 20.4711 14.5323 20.4816 14.5323 20.4921V20.5131C14.5323 20.5341 14.5323 20.5446 14.5323 20.5655C14.5323 20.576 14.5323 20.576 14.5323 20.5865C14.5323 20.597 14.5323 20.6075 14.5323 20.6075C14.5323 20.618 14.5323 20.618 14.5323 20.6285V20.639C14.5323 20.66 14.5224 20.6705 14.5125 20.6915C14.5026 20.7125 14.4927 20.723 14.4827 20.7439C14.4133 20.9014 14.225 20.9853 14.0068 20.9748Z"
      fill="white"
    />
    <path
      d="M14.7313 20.2086C14.7313 20.1877 14.7214 20.1772 14.7115 20.1562C14.7115 20.1457 14.7115 20.1457 14.7016 20.1352C14.6917 20.1037 14.6818 20.0827 14.6619 20.0512C14.5529 19.8308 14.3744 19.621 14.1563 19.4531C14.1266 19.4321 14.0968 19.4111 14.0671 19.3901C14.0373 19.3691 14.0076 19.3481 13.9778 19.3376H13.9679C13.958 19.3271 13.9481 19.3271 13.9382 19.3166C13.9183 19.3061 13.9084 19.2956 13.8886 19.2851H13.8787C13.8688 19.2851 13.8589 19.2747 13.8489 19.2747C13.8291 19.2642 13.8093 19.2537 13.7895 19.2537L13.7696 19.2432C13.7696 19.2432 13.7696 19.2432 13.7597 19.2432C13.7498 19.2432 13.7399 19.2327 13.73 19.2327C13.7101 19.2222 13.6903 19.2222 13.6705 19.2117L13.6507 19.2012H13.6407C13.6209 19.1907 13.6011 19.1907 13.5813 19.1802C13.5713 19.1802 13.5614 19.1697 13.5416 19.1697H13.5317C13.5119 19.1697 13.492 19.1592 13.4821 19.1592C13.4722 19.1592 13.4524 19.1592 13.4425 19.1487H13.4325C13.4226 19.1487 13.4127 19.1487 13.4028 19.1382C13.3929 19.1382 13.383 19.1382 13.373 19.1382C13.3433 19.1382 13.3036 19.1277 13.2739 19.1277H13.264C13.2342 19.1277 13.2045 19.1277 13.1748 19.1277C13.1648 19.1277 13.1549 19.1277 13.1549 19.1277H13.145C13.1252 19.1277 13.1054 19.1277 13.0855 19.1382C13.0756 19.1382 13.0657 19.1382 13.0558 19.1487C13.036 19.1487 13.0161 19.1592 12.9963 19.1592C12.9864 19.1592 12.9765 19.1697 12.9666 19.1697L13.5119 18.2357L14.6818 18.2462L15.2866 19.3796L14.7413 20.3241C14.7413 20.3136 14.7413 20.3031 14.7313 20.2926C14.7313 20.2821 14.7313 20.2821 14.7313 20.2716C14.7313 20.2611 14.7214 20.2506 14.7214 20.2296C14.7313 20.2191 14.7313 20.2086 14.7313 20.2086Z"
      fill="white"
    />
    <path
      d="M16.8028 21.5307L13.9474 21.5202L13.5111 22.3912L13.2137 22.9894L13.9771 22.9789V22.9894L18.3395 22.9999L18.7758 22.2023L15.6328 16.5039L9.39658 16.4934L9 17.228L9.07932 17.3644H9.0694L11.548 21.9819L12.3709 20.5652L10.9234 17.9626H14.8397L16.8028 21.5307Z"
      fill="white"
    />
    <defs>
      <radialGradient
        id="paint0_radial_24_873"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-19.5 -15) rotate(42.4664) scale(79.9812)"
      >
        <stop stop-color="white" />
        <stop offset="0.609995" stop-color="white" stop-opacity="0" />
      </radialGradient>
    </defs>
  </IconWrapper>
);
