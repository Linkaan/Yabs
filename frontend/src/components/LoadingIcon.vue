<template>
  <div
    id="loading"
    class="mx-auto"
  >
    <div
      v-for="x in 8"
      :key="x"
    />
  </div>
</template>

<style scoped lang="sass">
    #loading
        width: 64px
        height: 64px
        
    #loading div
        animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite
        transform-origin: 32px 32px
        
    #loading div:after
        content: " "
        display: block
        position: absolute
        width: 6px
        height: 6px
        border-radius: 50%
        background: #28a745
        margin: -3px 0 0 -3px
    
    #loading div:nth-child(1)
        animation-delay: -0.036s
        
    #loading div:nth-child(1):after
        top: 50px
        left: 50px
        
    #loading div:nth-child(2)
        animation-delay: -0.072s
        
    #loading div:nth-child(2):after
        top: 54px
        left: 45px
        
    #loading div:nth-child(3)
        animation-delay: -0.108s
        
    #loading div:nth-child(3):after
        top: 57px
        left: 39px
    
    #loading div:nth-child(4)
        animation-delay: -0.144s
       
    #loading div:nth-child(4):after
        top: 58px
        left: 32px
    
    #loading div:nth-child(5)
        animation-delay: -0.18s
    
    #loading div:nth-child(5):after
        top: 57px
        left: 25px
    
    #loading div:nth-child(6)
        animation-delay: -0.216s
    
    #loading div:nth-child(6):after
        top: 54px
        left: 19px
    
    #loading div:nth-child(7)
        animation-delay: -0.252s
        
    #loading div:nth-child(7):after
        top: 50px
        left: 14px
        
    #loading div:nth-child(8)
        animation-delay: -0.288s
        
    #loading div:nth-child(8):after
        top: 45px
        left: 10px
        
    @keyframes lds-roller
        0%
            transform: rotate(0deg)
        
        100%
            transform: rotate(360deg)
</style>