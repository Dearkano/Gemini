declare module '@gemini'{
  export interface IRecentMessage {
    /**
     * 用户 ID
     */
    userId: number
    username: string
    /**
     * 发信时间
     */
    time: string
    /**
     * 最后一条消息
     */
    lastContent: string
  }
}
